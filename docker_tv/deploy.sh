#!/bin/bash

# create a volume
docker volume create app-vol

# create a network
docker network create app-net

# create the database
docker run -d -v app-vol:/var/lib/mysql --name app-db --network app-net chukmunnlee/tvdb:v1

# create x instances of the application
docker run -d -p 5000:3000 --name app0 -e DB_HOST=app-db --network app-net chukmunnlee/tvdb:v1
docker run -d -p 5001:3000 --name app1 -e DB_HOST=app-db --network app-net chukmunnlee/tvdb:v1
docker run -d -p 5002:3000 --name app2 -e DB_HOST=app-db --network app-net chukmunnlee/tvdb:v1

