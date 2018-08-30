#!/bin/bash
git pull
sudo docker stop frontend
sudo docker container rm frontend
cd ./Front && sudo docker build -t denice/nginxapp .
sudo docker run -d -p 1112:80 --name frontend denice/nginxapp
