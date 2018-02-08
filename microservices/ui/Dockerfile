FROM node:8

RUN apt-get update && apt-get install -y build-essential python

#Install deps
RUN mkdir /app
COPY app/package.json /app/package.json
COPY app/package-lock.json /app/package-lock.json
COPY app/webpack.config.js /app/webpack.config.js
COPY app/.babelrc /app/.babelrc

RUN cd /app && npm install && npm run build
RUN npm -g install serve

#Add all source code
ADD app /app/
RUN cd /app 

WORKDIR /app

#Default command
CMD ["serve", "-s", "public", "-p", "8080"]
