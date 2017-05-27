# encoding: utf-8
from __future__ import unicode_literals, absolute_import

import os
import sys
import tornado.websocket
import tornado.web
import tornado.ioloop
import redis

from tornado import gen
from tornado.tcpserver import TCPServer
from tornado.iostream import StreamClosedError

from logs.utility import get_last_lines
from logs import settings


class SubWebSocket(tornado.websocket.WebSocketHandler):
    def open(self, *args, **kwargs):
        print("opened")

    @gen.coroutine
    def on_message(self, message):
        hostname = message
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=5)
        key = settings.LOG_KEY.format(server=hostname.strip())
        channel = r.pubsub()
        channel.subscribe(key)
        try:
            while True:
                line = channel.get_message()
                if not line:
                    yield gen.sleep(0.5)
                    continue
                self.write_message(line.strip())
        except tornado.websocket.WebSocketClosedError as e:
            self.close()

    def on_close(self):
        print("closed")


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    @gen.coroutine
    def on_message(self, message):
        log = message
        print "log file: ", log

        try:
            for line in get_last_lines(log):
                self.write_message(line)
            with open(log, 'r') as f:
                f.seek(0, 2)
                while True:
                    line = f.readline()
                    if not line:
                        yield gen.sleep(0.5)
                        continue
                    self.write_message(line.strip())
        except tornado.websocket.WebSocketClosedError as e:
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
        location = self.get_argument("location", "local")
        context = {
            "log": log,
            "hostname": hostname,
            "location": location,
        }
        self.render("index.html", **context)


class EchoServer(TCPServer):
    @gen.coroutine
    def handle_stream(self, stream, address):
        print "hello"
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=5)
        hostname = yield stream.read_until(b'\n\n')
        key = settings.LOG_KEY.format(server=hostname.strip())
        r.delete(key)
        channel = r.pubsub()

        while True:
            try:
                data = yield stream.read_until(b'\n')
                channel.publish(key, data)
            except StreamClosedError:
                break


if __name__ == "__main__":
    app = Application()
    if len(sys.argv) < 2:
        port = 8005
    else:
        port = sys.argv[1]
    app.listen(port, "0.0.0.0")

    server = EchoServer()
    server.listen(8080)

    tornado.ioloop.IOLoop.instance().start()
