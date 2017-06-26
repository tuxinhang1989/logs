# encoding: utf-8

LOG_KEY = "logs:catalina:{server}"

LOG_NAME = "catalina.out"

REDIS_HOST = "127.0.0.1"

REDIS_PORT = "6379"

REDIS_PASSWD = None

REDIS_EXPIRE = 300

KYLIN_HOST = "kylin-dev.niwodai.net"
SERVER_UPDATE_URL = "/cmdb/servers/update/all/"
UPDATE_INTERVAL = 60 * 60 * 1000

try:
    from local_settings import *
except ImportError:
    pass

