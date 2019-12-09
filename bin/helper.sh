sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -i -u postgres
psql
create user admin with encrypted password '1234';
create database unchain_db;
grant all privileges on database unchain_db to admin;