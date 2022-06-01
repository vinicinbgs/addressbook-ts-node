#!/bin/sh

set -e
  
host="$1"
password="$2"

shift
  
until PGPASSWORD=$password psql -h "$host" -U "root" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec "$@"