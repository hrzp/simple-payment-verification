# simple-payment-verification
It's a simple Blockchain method that verifies transaction without Blockchain complexity

### How to run:
In this case, you need three nodes to run this project.
Every node should do these steps to run:
```sh
$ Git clone https://github.com/hrzp/simple-payment-verification.git
$ npm install
$ node bin/www
```
Please pay attention you have to install Postgres and create "unchain_db" database.
Set database config in this file:
src/database/index.js
