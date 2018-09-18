#!/bin/bash

ng build
docker build -t harilab/keepmvn-portal:0.0.3 .
docker tag "harilab/keepmvn-portal:0.0.3" "harilab/keepmvn-portal:latest"
docker push harilab/keepmvn-portal:0.0.3
docker push harilab/keepmvn-portal:latest