#!/bin/bash -e

bluehawk \
  --plugin "`npx bluehawk-plugin-git`" \
  git copy \
  --to-repo "$INPUTS_TO_REPO" \
  --state "$INPUTS_STATE" \
  --branch "$INPUTS_STATE" \
  --delete-everything \
  "$INPUTS_SOURCE"
