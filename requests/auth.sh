#!bin/sh

ENDPOINT="http://localhost:3000/api/v1"

ACTION=$1

if [[ $ACTION == "register" ]]; then
    echo "=============== REGISTER ==============="
    curl --header "Content-Type: application/json" \
        -i -X POST \
        --data '{"email": "test@test.com", "password":"12345678"}' \
        "${ENDPOINT}/register"
fi;

if [[ $ACTION == "auth" ]]; then
    echo "=============== AUTH ==============="
    curl --header "Content-Type: application/json" \
        -i -X POST \
        --data '{"email": "test@test.com", "password":"12345678"}' \
         "${ENDPOINT}/auth"
fi;
