#!/bin/sh -l

#echo "Show contents of $(pwd):"
#ls -la
#echo "Finding all files..."
#find . -type f
cd .github/actions/docker-env
npm install
node main.js