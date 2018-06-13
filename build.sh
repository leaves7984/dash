#!/bin/bash

ng build
docker build -t parmantolab2/keepmvn-portal:0.0.7 .
docker tag "parmantolab2/keepmvn-portal:0.0.7" "parmantolab2/keepmvn-portal:latest"
docker push parmantolab2/keepmvn-portal:0.0.7
docker push parmantolab2/keepmvn-portal:latest