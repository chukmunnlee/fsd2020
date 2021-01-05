drop database if exists paf2020;

create database paf2020;

use paf2020;

create table user (
	user_id varchar(64) not null,
	password varchar(64) not null,
	email varchar(128) not null,
	primary key(user_id)
);

insert into user(user_id, password, email) values
	('fred', sha1('fred'), 'fred@gmail.com'),
	('wilma', sha1('wilma'), 'wilma@hotmail.com'),
	('barney', sha1('barney'), 'barney@gmail.com'),
	('betty', sha1('betty'), 'betty@gmail.com');
