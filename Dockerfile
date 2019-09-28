FROM node:12

RUN apt-get update -y
RUN apt-get install apt-transport-https -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y && apt-get install -y yarn

ADD package.json /code/
WORKDIR /code

RUN yarn
