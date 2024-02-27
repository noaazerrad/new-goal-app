# goals-app

The purpose of this app is to allow users to create goals and keep track of their progress by reporting updates, \
thereby enabling them to monitor their progress status over time.

In order to run the app, will use docker-compose commands. run the following:
1. `docker compose build`
2. `docker compose up`


In case you would like to run the app manually read and follow the instructions below:

Before running the setup commands, make sure you have the following installed:
1. Docker - Docker is used to create a PostgreSQL container
2. node.js - is required to run the client application
3. Ruby on rails - is required to run the server

DB setup
1. Creates and starts a PostgreSQL Docker container: 
   * `docker run --name app_development_db -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e
   POSTGRES_DB=app_development_db -d postgres:13.10`
2. To run migrations and seed data, navigate to the 'api/' directory and execute the following commands:
   * `rails db:create`
   * `rails db:migrate`
   * `rails db:seed`

\
Run App:
1. To run the server, navigate to the 'api/' directory and then execute: rails s
2. To run the client, navigate to the 'client/' directory and execute: npm start




