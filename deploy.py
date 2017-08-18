#!/usr/bin/env python
import os
os.system('rm -rf server/images/ && git add . && git ci -m "update" && git push origin master && git push heroku master')