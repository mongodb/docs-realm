#! /bin/bash

# standard bluehawking
bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test \
-o $(git rev-parse --show-toplevel)/source/examples/generated/flutter

# bluehawk state='dart'
bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test \
-o $(git rev-parse --show-toplevel)/source/examples/generated/flutter/dart \
--state dart

# bluehawk state='flutter'
bluehawk snip $(git rev-parse --show-toplevel)/examples/dart/test \
-o $(git rev-parse --show-toplevel)/source/examples/generated/flutter \
--state flutter
