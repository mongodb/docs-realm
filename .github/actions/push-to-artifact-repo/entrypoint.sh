#!/bin/bash -ex

npm i -g bluehawk bluehawk-plugin-git

git config --global user.email "$INPUT_EMAIL"
git config --global user.name "$INPUT_NAME"

for state in $INPUT_STATES; do
  bluehawk \
    --plugin "`bluehawk-plugin-git`" \
    git copy \
    --to-repo "$INPUT_TOREPO" \
    --state $state \
    --branch $state \
    --delete-everything \
    "$INPUT_SOURCE"
done
