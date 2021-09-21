#!/bin/bash

npm install

./build-render.sh
./build-abi.sh

yarn --cwd ./app/
yarn --cwd ./app/ build