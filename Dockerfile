FROM node:10.7.0

RUN mkdir -p /usr/web/
COPY . /usr/web/
WORKDIR /usr/web/

RUN npm i yarn -g
RUN npm i http-server -g
RUN yarn install
RUN yarn build

EXPOSE 80

ENTRYPOINT ["sh", "entrypoint.sh"]