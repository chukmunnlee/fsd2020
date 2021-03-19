# add the base image
FROM mysql:8

# set the root password to changeit
ENV MYSQL_ROOT_PASSWORD=changeit

# copy leisure.sql from the local directory into /docker-entrypoint-initdb.d
ADD leisure.sql /docker-entrypoint-initdb.d

# expose 3306
EXPOSE 3306