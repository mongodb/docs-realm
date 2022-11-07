import 'dart:convert';
import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';

const APP_ID = "example-testers-kvjdy";
main() {
  late App app;
  late EmailPasswordAuthProvider authProvider;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    authProvider = EmailPasswordAuthProvider(app);
    final email = "lisa@example.com";
    final password = "myStr0ngPassw0rd";
    try {
      await authProvider.registerUser(email, password);
    } catch (err) {
      print(err);
    }
    await app.logIn(Credentials.emailPassword(email, password));
  });
  tearDownAll(() async {
    if (app.currentUser != null) {
      await app.currentUser?.logOut();
    }
  });
  group("Atlas Functions tests", () {
    test("Basic Function usage", () async {
      final user = app.currentUser!;
      // :snippet-start: call-function
      final response = await user.functions.call("sum", [1, 2]);

      // convert EJSON response to Dart number
      final responseAsNum = num.tryParse(response["\$numberLong"]);

      prints(responseAsNum); // prints 3
      // :snippet-end:
      expect(responseAsNum, 3);
    });
    test("Objects in Function arguments", () async {
      final user = app.currentUser!;
      // :snippet-start: objects-in-args
      final harriet = {"firstName": "Harriet", "lastName": "Page", "age": 24};
      final fiona = {"firstName": "Fiona", "lastName": "Baldwin"};

      // Use jsonEncode() from the dart:convert package to encode
      // the Dart objects as JSON.
      final guests = await user.functions
          .call("addToGuestList", [jsonEncode(harriet), jsonEncode(fiona)]);
      // :snippet-end:

      expect(guests.length, 2);
    });
  });
}
