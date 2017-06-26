FROM ubuntu:latest
MAINTAINER Jay Shollenberger jay@jayshollenberger.com
RUN apt-get update -y
RUN apt-get install -y nginx