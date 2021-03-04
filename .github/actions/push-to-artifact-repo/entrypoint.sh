#!/bin/bash -ex

npm i -g bluehawk bluehawk-plugin-git

git config --global user.email "$INPUT_EMAIL"
git config --global user.name "$INPUT_NAME"

bluehawk \
  --plugin "`bluehawk-plugin-git`" \
  git copy \
  --to-repo "$INPUT_TOREPO" \
  --state "$INPUT_STATE" \
  --branch "$INPUT_STATE" \
  --delete-everything \
  "$INPUT_SOURCE"
