FROM pierrezemb/gostatic
MAINTAINER I Made Agus Setiawan <madeagus@gmail.com>

COPY dist/auth-app2 /srv/http
EXPOSE 8043
