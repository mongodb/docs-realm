#!/bin/bash -e

npm i -g bluehawk bluehawk-plugin-git

bluehawk \
  --plugin "`bluehawk-plugin-git`" \
  git copy \
  --to-repo "$INPUTS_TO_REPO" \
  --state "$INPUTS_STATE" \
  --branch "$INPUTS_STATE" \
  --delete-everything \
  "$INPUTS_SOURCE"
