#! /bin/bash

bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test -d $(git rev-parse --show-toplevel)/source/examples/generated/flutter
