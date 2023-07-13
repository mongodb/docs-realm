#! /bin/bash

PROJECT=$(git rev-parse --show-toplevel)
NODE=$PROJECT/examples/node
GENERATED_EXAMPLES=$PROJECT/source/examples/generated/node

# standard bluehawking
rm -f "$GENERATED_EXAMPLES"/*
echo "Bluehawking Node unit test examples..."
bluehawk snip "$NODE_EXAMPLES"/__tests__ -o "$GENERATED_EXAMPLES"

# TODO: for using Detype to generate JS from TS.
# npx detype "$GENERATED_EXAMPLES" "$GENERATED_EXAMPLES"
