#! /bin/bash

PROJECT=$(git rev-parse --show-toplevel)
NODE_EXAMPLES=$PROJECT/examples/node/v12
GENERATED_EXAMPLES=$PROJECT/source/examples/generated/node

# standard bluehawking
echo "Bluehawking Node unit test examples..."
bluehawk snip $NODE_EXAMPLES/__tests__ -o $GENERATED_EXAMPLES

# Bluehawk bundle example
# echo "Bluehawking Flutter bundle example..."
# bluehawk snip $NODE_EXAMPLES/bin/myapp.dart -o $GENERATED_EXAMPLES
# bluehawk snip $NODE_EXAMPLES/bundle_example -o $GENERATED_EXAMPLES

# Bluehawk testing SDK examples
# echo "Bluehawking testing SDK examples..."
# bluehawk snip $NODE_EXAMPLES/test_sdk_example/test -o $GENERATED_EXAMPLES
