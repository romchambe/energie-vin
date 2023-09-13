#!/bin/bash
set -e

# create volume for the data
docker volume create --name db_data -d local

# start docker container
docker-compose up -d --remove-orphans --wait