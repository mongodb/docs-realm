#! /bin/bash

bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test -o $(git rev-parse --show-toplevel)/source/examples/generated/flutter
