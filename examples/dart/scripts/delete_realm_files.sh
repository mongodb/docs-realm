#! /bin/bash

# from the dart directory, run ./scripts/delete_realm_files.sh
rm -rf *.realm.lock *.realm *.realm.note *.realm.management mongodb-realm
echo 'deleted the realm files'
