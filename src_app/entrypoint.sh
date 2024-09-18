#!/bin/sh

# Wait for the PostgreSQL service to be ready
# until pg_isready -h localhost -p 5432; do
#   echo "Waiting for PostgreSQL to start..."
#   sleep 2
# done

# Change to app directory
cd /app

# Run the Node.js app
npx prisma generate
npx prisma db push

npx prisma studio & npm run start
