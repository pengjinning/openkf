#!/bin/bash

cd apps/viewer;
node  -e "const { configureRuntimeEnv } = require('next-runtime-env/build/configure'); configureRuntimeEnv();"
cd ../..;

NODE_OPTIONS=--no-node-snapshot HOSTNAME=0.0.0.0 PORT=9010 node apps/viewer/server.js;
