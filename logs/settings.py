# encoding: utf-8

LOG_KEY = "logs:catalina:{server}"

LOG_NAME = "catalina.out"
TAIL_LINE_NUM = 10

REDIS_HOST = "127.0.0.1"
REDIS_PORT = "6379"
REDIS_PASSWD = None
REDIS_EXPIRE = 300

KYLIN_HOST = "192.168.66.105:8000"
SERVER_UPDATE_URL = "/cmdb/servers/api/v1/"
UPDATE_INTERVAL = 60 * 60 * 1000

try:
    from local_settings import *
except ImportError:
    pass
