# encoding: utf-8
from __future__ import unicode_literals, absolute_import

import os
import sys
import redis
import tornado.websocket
import tornado.web
import tornado.ioloop

from redis.client import PubSub
from salt.client import get_local_client
from tornado import gen
from tornado.escape import to_unicode

from logs.utility import get_last_lines
from logs import settings

REDIS_CONNECTION_POOL = redis.ConnectionPool(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWD, db=5
)


class SubWebSocket(tornado.websocket.WebSocketHandler):
    def open(self, *args, **kwargs):
        self.pubsub = PubSub(REDIS_CONNECTION_POOL, ignore_subscribe_messages=True)
        self.client = self.request.connection.context.address
        print("opened")

    def assemble_cmd(self, log_path, cmd):
        kill_cmd = "kill `ps aux|grep logtail.py|grep %s|grep -v grep|awk '{print $2}'`" % (log_path,)
        return "{kill};{tail}".format(kill=kill_cmd, tail=cmd)

    @gen.coroutine
    def on_message(self, message):
        local = get_local_client(io_loop=tornado.ioloop.IOLoop.instance())
        hostname, log_path, cmd = message.split("||")
        cmd = self.assemble_cmd(log_path, cmd)
        self.channel = settings.LOG_KEY.format(
                server=hostname.strip(), log_path=log_path.strip())
        self.pubsub.subscribe(**{self.channel: self.channel_callback})
        local.cmd_async(hostname, "cmd.run", [cmd])
        while self.pubsub.subscribed:
            if not self.pubsub.connection.can_read(timeout=0):
                yield gen.sleep(0.05)
            else:
                self.pubsub.get_message()
        self.pubsub.close()
        print 'pubsub closed'

    def channel_callback(self, message):
        line = format_line(message["data"])
        try:
            self.write_message(line)
        except tornado.websocket.WebSocketClosedError:
            self.pubsub.unsubscribe(self.channel)

    def on_close(self):
        self.pubsub.unsubscribe(self.channel)
        print("closed")


def format_line(line):
    line = to_unicode(line)
    if "INFO" in line:
        color = "#46A3FF"
    elif "WARN" in line:
        color = "#FFFF37"
    elif "ERROR" in line:
        color = "red"
    elif "CRITICAL" in line:
        color = "red"
    else:
        color = "#FFFFFF"

    return "<span style='color:{}'>{}</span>".format(color, line)


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    @gen.coroutine
    def on_message(self, message):
        log = message
        print "log file: ", log
        if not os.path.isfile(log):
            self.write_message("file not exists")
            return

        with open(log, 'r') as f:
            for line in get_last_lines(f):
                line1 = format_line(line)
                self.write_message(line1)
            while self.ws_connection:
                line = f.readline()
                if not line:
                    yield gen.sleep(0.05)
                    continue
                self.write_message(format_line(line.strip()))

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

