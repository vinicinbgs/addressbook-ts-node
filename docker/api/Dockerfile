FROM node:16

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python

RUN npm install npm -g
RUN npm install node-gyp -g

COPY package.json package-lock.json* ./
RUN npm cache clean --force

COPY . ./

RUN npm install bcrypt --save

RUN npm install --ignore-scripts

EXPOSE 3000

CMD ["./docker/api/wait-for-postgres.sh", "db", "root"]

ENTRYPOINT [ "npm", "run", "dev" ]