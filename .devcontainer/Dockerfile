## Required build tools (https://github.com/nodejs/node-gyp#on-unix) are already installed in this image.
FROM node:latest

## One extra tool was needed => Ref: https://github.com/alexander-akhmetov/python-telegram/issues/3
RUN apt-get update && apt-get install musl-dev -y
CMD ["ln", "-s", "/usr/lib/x86_64-linux-musl/libc.so", "/lib/libc.musl-x86_64.so.1"]