#!/bin/bash -e

# See README.md
# If you do not have access to the mongodb-docs profile, talk to a member of the
# Developer Education team

cd "$(dirname "$0")"
aws s3 --profile Docs.User-683862839917 sync . s3://realm-sdks/realm-sdks/ \
  --exclude '.git/*' \
  --exclude 'README.md' \
  --exclude 'upload.sh' \
  --acl public-read
