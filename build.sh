#!/bin/bash

ng build
docker build -t parmantolab2/keepmvn-portal:0.0.9 .
docker tag "parmantolab2/keepmvn-portal:0.0.9" "parmantolab2/keepmvn-portal:latest"
docker push parmantolab2/keepmvn-portal:0.0.9
docker push parmantolab2/keepmvn-portal:latest