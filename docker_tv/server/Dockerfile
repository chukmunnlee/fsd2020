FROM node:15

# setup the image
# define env variables
# database
ENV DB_HOST=tvdb DB_PORT=3306 DB_USER=root DB_PASSWORD=changeit
# app
ENV PORT=3000 APP_ROOT=/app

# change into APP_ROOT directory
WORKDIR ${APP_ROOT}

# copy files from local machine into conatiner
ADD main.js .
ADD package.json .
ADD package-lock.json .
ADD views views

# install dependencies
RUN npm i

# run the image
EXPOSE ${PORT}

ENTRYPOINT [ "node", "main.js" ]