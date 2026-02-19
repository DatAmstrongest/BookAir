#!/bin/bash
if podman ps -a | grep "bookingDB"; then
	if podman ps | grep "bookingDB"; then
		echo "Database is running already"
	else
		podman start $(podman ps -a -q --filter "name=bookingDB")
		echo "Database is started"
	fi
else
	podman run --detach --name bookingDB -p 5000:27017 docker.io/mongodb/mongodb-community-server:latest
	echo "Database container is created and database started"
fi
