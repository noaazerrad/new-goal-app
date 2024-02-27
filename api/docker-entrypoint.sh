#!/bin/bash
# Script to delete the server.pid file before starting the Rails server.
# This is necessary to prevent issues with multiple server instances.
set -e

# Check if the server.pid file exists and remove it if it does.
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

# Executes the command
exec bundle exec "$@"