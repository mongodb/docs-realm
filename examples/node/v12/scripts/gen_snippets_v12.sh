#! /bin/bash

PROJECT=$(git rev-parse --show-toplevel)
INPUT_DIRECTORY=$PROJECT/examples/node/v12
OUTPUT_DIRECTORY=$PROJECT/source/examples/generated/node/v12

# standard bluehawking
rm -f "$OUTPUT_DIRECTORY"/*
echo "Bluehawking Node unit test examples..."
bluehawk snip "$INPUT_DIRECTORY"/__tests__ -o "$OUTPUT_DIRECTORY"

# TODO: for using Detype to generate JS from TS.
# npx detype "$OUTPUT_DIRECTORY" "$OUTPUT_DIRECTORY"
