#!/bin/bash

podman run --detach --name bookingDB -p 5000:27017 docker.io/mongodb/mongodb-community-server:latest
