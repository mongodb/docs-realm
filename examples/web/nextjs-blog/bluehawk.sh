#! /bin/bash

bluehawk snip . -o $(git rev-parse --show-toplevel)/source/examples/generated/web
