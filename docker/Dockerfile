## Required build tools (https://github.com/nodejs/node-gyp#on-unix) are already installed in this image.
FROM node:latest

## Install and run @manufac-analytics/inchi
RUN npm install -g @manufac-analytics/inchi@latest
WORKDIR /usr/local/lib/node_modules/@manufac-analytics/inchi
CMD ["npm", "run", "serve"]
