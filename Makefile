SHELL := /bin/bash
# https://stackoverflow.com/questions/1789594/how-do-i-write-the-cd-command-in-a-makefile
.ONESHELL: # Applies to every targets in the file!

create-db:
	sudo docker run --name app_development_db \
   	-p 5432:5432 \
   	-e POSTGRES_USER=user \
   	-e POSTGRES_PASSWORD=password \
   	-e POSTGRES_DB=app_development_db \
   	-d postgres:13.10

setup-db:
	cd ./api/ && rails db:create && rails db:migrate && rails db:seed

run-app:
	cd ./client/ && npm start & \
	cd ./backend/ && rails s
