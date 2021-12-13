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

import_csv() {
    local csv_filename="$1"
    local mongo_collection="$2"

    local csv_file_full_path=${script_dir}/../datafiles/${csv_filename}
    if [[ ! -f "${csv_file_full_path}" ]]
    then  
        echo "CSV Input file ${csv_file_full_path} is not found, exiting script"
        exit 1
    fi 

    echo "Copying over CSV Input file ${csv_file_full_path} to Docker container"
    docker cp "${csv_file_full_path}" "${MONGO_DOCKER_NAME}:/tmp/${csv_filename}"

    echo "Importing the CSV to Collection ${mongo_collection}"
    docker exec "${MONGO_DOCKER_NAME}" mongoimport --db sic_code --collection ${mongo_collection} --file /tmp/${csv_filename} --drop --type=csv --headerline

}

import_csv SIC07_CH_condensed_list_en.csv condensed_sic_codes

import_csv ch_created_activity_sic_codes.csv ch_created_activity_sic_codes

import_csv uksic_2007_alphabetica_index_nov_2020.csv economic_activity_sic_codes
