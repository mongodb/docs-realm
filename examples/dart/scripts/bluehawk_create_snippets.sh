#! /bin/bash

DIR_OUT=$(git rev-parse --show-toplevel)/source/examples/generated/flutter

# standard bluehawking
bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test \
-o $DIR_OUT
