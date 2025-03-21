#!/bin/sh

# Build the Docker image
docker build -t test_frontend .

# Run the container with port mapping and privileged mode
docker run --privileged -p 80:80 -it -d test_frontend

