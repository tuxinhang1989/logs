# encoding: utf-8
from __future__ import division
import redis

import tornado.ioloop
import salt.client

from pyVim.connect import SmartConnect, Disconnect
from pyVmomi import vim

from tornado import gen
from tornado.tcpserver import TCPServer
from tornado.iostream import StreamClosedError
from tornado.ioloop import PeriodicCallback

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


def update_server():
    local = salt.client.LocalClient()
    client_path = "/tmp/sysinfo.py"
    salt_path = "salt://sysinfo.py"
    api = "http://{0}{1}".format(settings.KYLIN_HOST, settings.SERVER_UPDATE_URL)
    cmd = "/usr/local/bin/python {0} {1}".format(client_path, api)
    local.cmd('*', "cp.get_file", [salt_path, client_path])
    local.cmd_async("*", "cmd.run", [cmd])


if __name__ == "__main__":
    server = EchoServer()
    server.listen(8080)
    pc = PeriodicCallback(update_server, settings.UPDATE_INTERVAL)
    pc.start()

    tornado.ioloop.IOLoop.instance().start()
