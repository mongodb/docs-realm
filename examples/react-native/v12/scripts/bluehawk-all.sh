
#! /bin/bash

# Use colors in terminal messages: https://notesontech.com/bash-text-formatting/

### Text formatting ###

CLEAR="\x1B[0m"

# Text settings.
BOLD="\x1B[1m"

# Text color.
RED="\x1B[31m"
GREEN="\x1B[32m"

# Background color with bold font.
RED_BG_BOLD="\x1B[1;41m"

### End of text formatting ###

PROJECT=$(git rev-parse --show-toplevel)
INPUT_DIRECTORY=$PROJECT/examples/react-native/v12/TestApp/__tests__
OUTPUT_DIRECTORY=$PROJECT/source/examples/generated/react-native/v12

# standard bluehawking
rm -f $OUTPUT_DIRECTORY/*
echo "${GREEN_BG} Bluehawking: ${CLEAR} ${GREEN}React Native v12 unit test examples ${CLEAR}"
bluehawk snip $INPUT_DIRECTORY -o $OUTPUT_DIRECTORY
echo "${GREEN_BG} Bluehawking: ${CLEAR} ${GREEN}complete! ${CLEAR}"

# TODO: for using Detype to generate JS from TS.
# npx detype "$OUTPUT_DIRECTORY" "$OUTPUT_DIRECTORY"
