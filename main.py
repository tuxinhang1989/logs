# encoding: utf-8
from __future__ import unicode_literals, absolute_import

import os
import sys
import tornado.websocket
import tornado.web
import tornado.ioloop
import redis
import salt.client

from tornado import gen

from logs.utility import get_last_lines
from logs import settings

FLAG = True


class SubWebSocket(tornado.websocket.WebSocketHandler):
    def open(self, *args, **kwargs):
        print("opened")

    @gen.coroutine
    def on_message(self, message):
        hostname, log_path, cmd = message.split("||")
        local = salt.client.LocalClient()
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT,
                              password=settings.REDIS_PASSWD, db=5)
        key = settings.LOG_KEY.format(server=hostname.strip(), log_path=log_path.strip())
        channel = r.pubsub()
        channel.subscribe(key)
        local.cmd_async(hostname, "cmd.run", [cmd])
        try:
            while True:
                data = channel.get_message()
                if not data:
                    yield gen.sleep(0.05)
                    continue
                if data["type"] == "message":
                    line = format_line(data["data"])
                    self.write_message(line)
        except tornado.websocket.WebSocketClosedError:
            self.close()

    def on_close(self):
        global FLAG
        FLAG = False
        print("closed")


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    @gen.coroutine
    def on_message(self, message):
        log = message
        print "log file: ", log

        try:
            with open(log, 'r') as f:
                for line in get_last_lines(f):
                    self.write_message(line)
                while True:
                    line = f.readline()
                    if not line:
                        yield gen.sleep(0.05)
                        continue
                    self.write_message(line.strip())
        except tornado.websocket.WebSocketClosedError:
            self.close()

    # def check_origin(self, origin):
    #     print origin, self.request.headers.get("Host")
    #     # super(EchoWebSocket, self).check_origin()
    #     return True

    def on_close(self):
        print("WebSocket closed")


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/log/', MainHandler),
            (r'/log/local', EchoWebSocket),
            (r'/log/remote', SubWebSocket),
        ]
        settings = {
            "debug": True,
            "template_path": os.path.join(os.path.dirname(__file__), "templates"),
            "static_path": os.path.join(os.path.dirname(__file__), "static"),
        }
        super(Application, self).__init__(handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        log = self.get_argument("log", None)
        hostname = self.get_argument("hostname", None)
        type = self.get_argument("type", "local")
        cmd = self.get_argument("cmd", "")
        context = {
            "log": log,
            "hostname": hostname,
            "type": type,
            "cmd": cmd,
        }
        self.render("index.html", **context)


if __name__ == "__main__":
    app = Application()
    if len(sys.argv) < 2:
        port = 8005
    else:
        port = sys.argv[1]
    app.listen(port, "0.0.0.0")

    tornado.ioloop.IOLoop.instance().start()

