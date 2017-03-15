#!/bin/bash
npm run build
git add .
git commit -m "$1$2"
git push origin master
git push local master
deploy production
