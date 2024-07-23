To call a Function, call  :flutter-sdk:`User.functions.call() <realm/FunctionsClient/call.html>`.
Pass the Function name as the first argument and all arguments for the Function
in a List as the second argument.

To include objects as arguments to the Function,
convert them to JSON first. You can do this using the `jsonEncode()
<https://api.flutter.dev/flutter/dart-convert/jsonEncode.html>`__
function included in the built-in ``dart:convert`` library.

The Function returns a ``dynamic`` value containing :manual:`MongoDB Extended JSON (EJSON)
</reference/mongodb-extended-json/>` deserialized to a native Dart object.
