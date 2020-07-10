#!/usr/bin/env bash

ip=192.168.142.3

hugo --i18n-warnings server --baseURL http://$ip:1313 --bind $ip

