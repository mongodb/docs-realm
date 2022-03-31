# Realm Dart Tests

## Setup

### Before You Begin

make sure you have Flutter 2.8 and Dart 2.15 flutter --version Flutter 2.8.1 • channel stable • https://github.com/flutter/flutter.git Framework • revision 77d935af4d (5 weeks ago) • 2021-12-16 08:37:33 -0800 Engine • revision 890a5fca2e Tools • Dart 2.15.1

### Steps

Run these commands to setup the application:

1. Disable Realm analytics. Set env variable `REALM_DISABLE_ANALYTICS=exists` either globally ( for example, in `.zshrc`) or locally to this terminal only. I suggest globally not to forget about it and upload analytics unneccessary.

2. get all packages for the example project:

```sh
dart pub get
```

3. Run the generator to generate the required Realm object definitions. (If asked "Found 4 declared outputs which already exist on disk.Delete these files?" use option 1. Delete):

```sh
dart run build_runner build
```

4. Run the project's tests **without concurrency**:

```sh
dart run test --concurrency=1
```

## API

For API usage, refer to the tests in the realm-dart repo: https://github.com/realm/realm-dart/blob/master/test/realm_test.dart

> The "Dart" name and logo and the "Flutter" name and logo are trademarks owned by Google.
