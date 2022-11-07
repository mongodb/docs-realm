final response = await user.functions.call("addition", [1, 2]);

// convert EJSON response to Dart number
final responseAsNum = num.tryParse(response["\$numberLong"]);

prints(responseAsNum); // prints 3
