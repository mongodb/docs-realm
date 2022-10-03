#! /bin/bash

DIR_OUT=$(git rev-parse --show-toplevel)/source/examples/generated/flutter

# remove existing examples in the directory
rm -rf $DIR_OUT/^(?!.*(/tutorial/))
echo "Deleted old snippets"

# standard bluehawking
bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test \
-o $DIR_OUT
