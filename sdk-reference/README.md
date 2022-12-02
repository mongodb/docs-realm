# Realm SDK Reference Manuals

This repo contains the Realm SDK Reference Manuals and the scripts to upload them.
SDK manuals are provided by leads of the various SDK projects, or you can build them
yourself.

## Adding a new version

- Unzip the docs to `<sdk>/<version>/`
- Update the `latest` symlink to point to the new version: `cd <sdk>/<version> && rm latest && ln -s <version> latest` (where sdk is the sdk name and version is the new version name)

Android, Kotlin, and Cocoa team docs are automatically uploaded by the Java team's CI. We are working on having the other SDK teams upload automatically.

## Publish

- Configure AWS access (see https://wiki.corp.mongodb.com/display/SYSENG/Command-line+Access) by typing `aws configure sso` and entering the following options:
  - SSO start URL: https://mongodbcorp.awsapps.com/start
  - SSO Region: us-east-1
  - `aws sso login` (if needed)
  - (A browser window should open and do various log in things through SSO, follow the prompts there)
  - select aws.docs User
 
- If you don't have AWS access to that bucket, talk to a member of @developer-education-team
- Use the upload.sh script to upload to the bucket. The upload.sh script is in the root directory of this repo. The bucket is hosted at https://docs.mongodb.com/realm-sdks
