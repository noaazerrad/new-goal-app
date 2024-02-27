SHELL := /bin/bash
# https://stackoverflow.com/questions/1789594/how-do-i-write-the-cd-command-in-a-makefile
.ONESHELL: # Applies to every targets in the file!


# create and starts a PostgreSQL Docker container named app_development_db
# if the image is not found locally, Docker will automatically pull it from the Docker Hub repository before creating and starting the container
create-db:
	docker run --name app_development_db \
   	-p 5432:5432 \
   	-e POSTGRES_USER=user \
   	-e POSTGRES_PASSWORD=password \
   	-e POSTGRES_DB=app_development_db \
   	-d postgres:13.10

# creates db in the postgres container, runs migration and populate the tables with initial data
setup-db:
	cd ./api/ && rails db:create && rails db:migrate && rails db:seed

# run both rails server and client app
run-app:
	cd ./client/ && npm start & \
	cd ./api/ && rails s
