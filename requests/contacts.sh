#!bin/sh

ENDPOINT="http://localhost:3000/api/v1/contacts"

ACTION=$1
JWT=$2

if [[ $ACTION == "create" ]] && [[ $JWT ]]; then
    echo "=============== CREATE ==============="
    
    curl --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${JWT}" \
        -i -X POST --data '{"first_name":"FIRST_NAME", "last_name":"LAST_NAME", "phone_number":"PHONE_NUMBER", "address":"ADDRESS"}' \
        ${ENDPOINT}
fi;

if [[ $ACTION == "list" ]] && [[ $JWT ]]; then
    echo "=============== LIST ALL ==============="
    curl -i --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${JWT}" \
        ${ENDPOINT}
fi;
