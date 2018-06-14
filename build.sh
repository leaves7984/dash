#!/bin/bash

ng build
docker build -t parmantolab2/keepmvn-portal:0.0.7x .
docker tag "parmantolab2/keepmvn-portal:0.0.7x" "parmantolab2/keepmvn-portal:latest"
docker push parmantolab2/keepmvn-portal:0.0.7x
docker push parmantolab2/keepmvn-portal:latest