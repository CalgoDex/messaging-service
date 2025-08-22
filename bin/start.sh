#!/bin/bash

set -e

echo "Starting the application..."
echo "Environment: ${ENV:-development}"

# run the application
npm run start:dev

echo "Application started successfully!" 