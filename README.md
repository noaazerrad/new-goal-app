# goals-app

The purpose of this app is to allow users to create goals and keep track of their progress by reporting updates, \
thereby enabling them to monitor their progress status over time.

Before running the commands make sure you the following configured:

1. Docker - Docker is used to create a PostgreSQL container, which is needed for the database.
   * If you prefer not to use sudo with Docker commands, ensure that your user is a member of the Docker group. You can check if your user is already part of the Docker group by running the following command in the terminal: groups
   * If you see "docker" in the list of groups, you can run Docker commands without using sudo.
   * If "docker" is not listed, you need to add your user to the Docker group. Run the following command in the terminal: sudo usermod -aG docker $USER
2. node.js - is required to run the client application
3. Ruby on rails - is required to run the server

To run the app through makefile commands please run the following from the root directory of the project: 
   * make create-db
   * make setup-db
   * make run-app

\
If you would like to run the commands **not** through the makefile, run the following:

DB setup
1. Creates and starts a PostgreSQL Docker container: 
   * docker run --name app_development_db -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e
   POSTGRES_DB=app_development_db -d postgres:13.10
2. To run migrations and seed data, navigate to the 'api/' directory and execute the following commands:
   * rails db:create
   * rails db:migrate
   * rails db:seed

\
\
Run App:
1. To run the server, navigate to the 'api/' directory and then execute: rails s
2. To run the client, navigate to the 'client/' directory and execute: npm start




