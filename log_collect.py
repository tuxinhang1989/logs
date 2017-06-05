# encoding: utf-8
import redis

import tornado.ioloop

from tornado import gen
from tornado.tcpserver import TCPServer
from tornado.iostream import StreamClosedError

from logs import settings


class EchoServer(TCPServer):
    @gen.coroutine
    def handle_stream(self, stream, address):
        print "hello"
        r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT,
                              password=settings.REDIS_PASSWD, db=5)
        hostname = yield stream.read_until(b'\n\n')
        key = settings.LOG_KEY.format(server=hostname.strip())
        r.delete(key)

        while True:
            try:
                data = yield stream.read_until(b'\n')
                r.publish(key, data.strip())
            except StreamClosedError:
                print "stream closed"
                import traceback
                traceback.print_exc()
                break
        # stream.close()

if __name__ == "__main__":
    server = EchoServer()
    server.listen(8080)
    tornado.ioloop.IOLoop.instance().start()
