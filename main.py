# encoding: utf-8
from __future__ import unicode_literals, absolute_import

import os
import tornado.websocket
import tornado.web
import tornado.ioloop

from tornado import gen

import log_tail


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    @gen.coroutine
    def on_message(self, message):
        log = message
        print "log file: ", log
        for line in log_tail.get_last_lines(log):
            self.write_message(line)

        try:
            for line in log_tail.get_last_lines(log):
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
            print e
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
            (r'/log', MainHandler),
            (r'/log/tail', EchoWebSocket),
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
        self.render("index.html", log=log)


if __name__ == "__main__":
    app = Application()
    app.listen(8005)
    tornado.ioloop.IOLoop.instance().start()

