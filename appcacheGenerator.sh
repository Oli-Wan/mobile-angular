#!/bin/bash

cd ./app
manifest=mobileapp.appcache
printf "CACHE MANIFEST\n#" > $manifest
date "+%Y-%m-%d %H:%M:%S" >> $manifest
printf "\nCACHE:\n" >> $manifest
find . -type "f" -name "*.js" -o -name "*.html" -o -name "*.json" -o -name "*.css" -o -name "*.png" -o -name "*.gif" >> $manifest
printf "\nNETWORK:\n*" >> $manifest
