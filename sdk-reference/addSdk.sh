#/bin/bash -ex

if [[ ! "$1" =~ ^[a-z-]+$ ]]; then
  echo "Usage: $0 <sdk-name>"
  exit 1;
fi

SDK=$1
mkdir -p $SDK
echo "<!doctype html>\
<head>\
  <meta http-equiv=\"refresh\" content=\"0; url=https://mongodb.com/docs/realm-sdks/$SDK/latest\" />\
</head>\
<body>\
  <p><a href=\"https://mongodb.com/docs/realm-sdks/$SDK/latest\">Redirect</a></p>\
</body>" > $SDK/index.html
