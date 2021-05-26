FROM node:latest
## Required build tools (https://github.com/nodejs/node-gyp#on-unix) are already installed in this image.
## One extra tool was needed => Ref: https://github.com/alexander-akhmetov/python-telegram/issues/3
RUN apt-get update && apt-get install musl-dev -y