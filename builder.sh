#!/bin/bash
docker build -t contacts-directory:latest .
ECHO "Running Container ...."
docker run --name contacts -d -p 3000:3000 contacts-directory
