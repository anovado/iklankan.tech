FROM nginx:stable
MAINTAINER Griffin  "sholeh@alterra.id"

RUN mkdir -p /home/griffin/www/iklankan/build 
RUN mkdir -p /home/griffin/log/nginx


COPY default.conf /etc/nginx/conf.d/

ADD build/. /home/griffin/www/iklankan/build 

WORKDIR /home/griffin/www/iklankan/build