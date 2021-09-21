#!/bin/bash

yarn
yarn ./build-abi.sh

yarn --cwd ./app/
yarn --cwd ./app/ build