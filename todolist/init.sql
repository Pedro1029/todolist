create database todolist;
create user pedro with encrypted password 'postgres';
grant all privileges on database todolist to pedro;