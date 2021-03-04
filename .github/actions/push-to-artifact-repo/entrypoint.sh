#!/bin/bash -ex

npm i -g bluehawk bluehawk-plugin-git

bluehawk \
  --plugin "`bluehawk-plugin-git`" \
  git copy \
  --to-repo "$INPUT_TOREPO" \
  --state "$INPUT_STATE" \
  --branch "$INPUT_STATE" \
  --delete-everything \
  "$INPUT_SOURCE"
