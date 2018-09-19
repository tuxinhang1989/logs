# encoding: utf-8
from __future__ import unicode_literals, division

import math

from logs import settings


def get_last_lines(f, num=settings.TAIL_LINE_NUM):
    size = 1000
    try:
        f.seek(-size, 2)
    except IOError:  # 文件内容不足size
        f.seek(0)
        return f.readlines()[-num:]

    data = f.read()
    lines = data.splitlines()
    n = len(lines)
    while n < num:
        size *= int(math.ceil(num / n))
        try:
            f.seek(-size, 2)
        except IOError:
            f.seek(0)
            return f.readlines()[-num:]
        data = f.read()
        lines = data.splitlines()
        n = len(lines)

    return lines[-num:]
