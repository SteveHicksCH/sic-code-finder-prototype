#!/bin/bash 

#
# Simple script to recreate your local Mongo Database running on Docker
# Use the environmental variable MONGO_DOCKER_NAME as per README.md
#
# The datafiles have fields in the first line
#
  
set -o errexit # abort on nonzero exitstatus
set -o pipefail  # don't hide errors within pipes

if [[ -z "${MONGO_DOCKER_NAME}" ]]
then
    echo "ERROR: MONGO_DOCKER_NAME environmental variable NOT set"
    exit 1
fi

script_dir=$(dirname "$0")
condensed_sic_code_filename=SIC07_CH_condensed_list_en.csv
condensed_sic_code_datafile=${script_dir}/../datafiles/${condensed_sic_code_filename}
if [[ ! -f "${condensed_sic_code_datafile}" ]]
then  
   echo "Condensed SIC Code file '$condensed_sic_code_datafile' is not found"
   exit 1
fi 

echo "Copying over Condensed SIC Codes ${condensed_sic_code_datafile} to Docker container"
#docker cp src/test/resources/restricted-word-import.json docker-chs-development_mongo_1:/tmp/restricted-word-import.json

docker cp "${condensed_sic_code_datafile}" "${MONGO_DOCKER_NAME}:/tmp/${condensed_sic_code_filename.csv}"

echo "Importing the Condensed SIC Codes"
docker exec "${MONGO_DOCKER_NAME}" mongoimport --db sic_code --collection condensed_sic_codes --file /tmp/${condensed_sic_code_filename.csv} --drop --type=csv --headerline
