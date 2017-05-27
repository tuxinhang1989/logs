# encoding: utf-8
from __future__ import unicode_literals, division

import math


def get_last_lines(log_name, num=10):
    with open(log_name, 'r') as f:
        size = 1000
        f.seek(-size, 2)
        data = f.read()
        lines = data.splitlines()
        if len(data) < size:
            return lines[-num:]

        n = len(lines)
        while n < num:
            size *= math.ceil(num / n)
            f.seek(-size, 2)
            data = f.read()
            lines = data.splitlines()
            n = len(lines)

        return lines[-num:]
