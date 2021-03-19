# what image are we using
FROM node:15

# configurables
ENV PORT=3000 APP_DIR=/app 

## how to build 

# create a directory and cd into it
WORKDIR ${APP_DIR}

# copy files from my local machine into the image
ADD fortune-cookie.js .
ADD main.js .
ADD package.json .
ADD package-lock.json .

# install the dependencies
RUN npm install

## how to run

# expose port 3000
EXPOSE ${PORT}

# run the application
ENTRYPOINT [ "node", "main.js" ]