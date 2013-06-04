#!/bin/bash

echo "Init"
echo "" > ./app/test.min.js
echo "done"

echo "Generating appcache..."
./appcacheGenerator.sh
echo "Done"

echo "Preparing angular.js files..."
find ./app/js -type "f" -name "*.js" -print0 | xargs -0 -I file sh -c 'ngmin < "file" >> "./app/test.js"'
echo "Done"

echo "Running uglifyer..."
uglifyjs "./app/test.js" -o "./app/test.min.js" -c -m
echo "Done"