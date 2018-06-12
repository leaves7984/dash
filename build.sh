#!/bin/bash

ng build
docker build -t parmantolab2/keepmvn-portal:0.0.5b .
docker tag "parmantolab2/keepmvn-portal:0.0.5b" "parmantolab2/keepmvn-portal:latest"
docker push parmantolab2/keepmvn-portal:0.0.5b
docker push parmantolab2/keepmvn-portal:latest