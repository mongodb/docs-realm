# Realm Examples

The Realm Examples project contains the Swift and iOS code examples for Realm
and their unit tests.

## Get Started

### Install Dependencies

This project uses CocoaPods to manage dependencies. To get started, run:

>⚠️ Minimum required CocoaPods version is 1.10.

```bash
pod install --repo-update
```

### Run Tests

Open the CocoaPods-generated .xcworkspace file with Xcode:

```bash
open RealmExamples.xcworkspace
```

To run the tests, ensure the "Test Examples" scheme is selected in the top left
and do one of the following:

- Press and hold the "Run" button (▶) to select "Test"
- In the Xcode menu, select Product > Test
- Type `⌘U`

### Understand the Project Structure

The following diagram shows the key items in the project directory:

| path                       | description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Examples/                  | Examples, test cases, and supporting source files. Add code here.                  |
| HostApp/                   | Source for the app that the tests run against. Do not modify.                      |
| QuickStartSwiftUI/         | Source for the SwiftUI and Combine quick start example app.                        |
| Podfile                    | The dependency spec for CocoaPods.                                                 |
| RealmExamples.xcodeproj/   | Xcode project file.                                                                |
| RealmExamples.xcworkspace/ | Dependency-aware Xcode workspace. Use this instead of .xcproj after `pod install`. |
| README.md                  | This file.                                                                         |

In short, `Examples/` should contain both Swift and Objective-C example and test code.

`QuickStartSwiftUI/` contains the source for the SwiftUI and Combine quick start.

## Develop

### Create a New Test Case File

If your new example does not fit well into one of the existing sections, you
should add a new test case file for your section.

In the Xcode menu, select File > New... > File... (or press `⌘N`). Select "Unit
Test Case Class" from the template menu and click "Next".

Enter the name of your test case class, select either Swift or Objective-C, and
click "Next".

In the file selector window, navigate to the `Examples/` directory.

- Ensure "Group" is set to "Examples"
- Under "Targets", only "RealmExamples" should be selected.

Click "Create" to create the file.

### Add an Example

Find the relevant test case file for the section or category you wish to write
an example for.

Each file should have one `XCTestCase`-derived test case class. Add a test
method to it, which can be named anything starting with `test...`. For example,
if the example shows how to open a realm, call the test function
`testOpenRealm`.

Next, add the example code. If the example doesn't fit in the test function body
itself, you may want to put the code outside of the test case class entirely.
For instance, an example may declare a class or something that can't be declared
in a function body. Realm objects cannot be declared as subtypes of other
objects. So, feel free to write your example in another part of the file, and
then test that example by referring to it in the test function.

> ⚠️ **Avoid Polluting the Global Scope**
>
> You may want to write an example where you define some class and then write a
> function that uses it. You want the example to be one contiguous block, and you
> don't want other examples using and diluting your class. That's perfectly fine.
> Just one slight problem: a class or function declared in the global scope of
> one file will collide with the same named class or function declared in the
> global scope of another file. In other words, there can be only one global
> `Dog`, `Task`, or `Car` class in this project. To avoid this, consider the
> following techniques:
>
> - Keep it local to a function, struct, or class. Keep as much of the example
>   code in the test function scope as possible.
> - Use the `private` keyword in Swift to keep an object local to a file.
> - Name the class or function something particularly file-specific, so it is
>   unlikely to be used in another example. A little contrivance is not to bad.
>   Say your class is for an example about inverse relationships, you might make
>   a `DogWithInverseRelationship` class specifically for it.

### Restore or Ignore State

These examples use a real backend, which means they can alter that backend's
state and cause the tests to be not exactly reproducible. Design your tests to
either clean up after themselves or not care whether a backend call really
succeeded, just that it completed.

> 💡 For example, the "Confirm Email" example will always try to confirm the
> user email address with a fake token, but this will always fail. No matter,
> just consider it a success if it reported the expected error message ("invalid
> token data") and move on.

The `TestSetup` class is the "primary class" for the test suite, which means
Xcode will instantiate one before running any tests. This is where we call a
function to delete any users and clear the host app of any data.

### Shred the Anonymous User

The iOS SDK recycles the same anonymous user until you remove them from the
device. This can affect other test cases. If your test case signs in as an
anonymous user, please remove the user from the device in your test's tearDown()
method. See `MultipleUsers` for an example.

### Wait for Asynchronous Callbacks

These examples are likely to use asynchronous methods, so you will need to use
`XCTestExpectation` to wait for the completion of calls.

https://developer.apple.com/documentation/xctest/asynchronous_tests_and_expectations/testing_asynchronous_operations_with_expectations

### Realm + SwiftUI + Combine Quick Start

The `QuickStartSwiftUI` directory -- `QuickStartSwiftUI/QuickStart.swift` in
particular -- contains the code for the SwiftUI and Combine quick start. To run,
open the workspace in Xcode and select the "QuickStartSwiftUI" target.

>⚠️ Note: you will need an iOS 14.0+ simulator or device to run this target.

## Code to Docs Pipeline

### Annotate for Bluehawk

Code examples are extracted using
[Bluehawk](https://github.com/MongoCaleb/bluehawk). In the source files, you can annotate code like so:

```swift
// :code-block-start: [id]
... some code for the code example ...

// :hide-start:
some code that should not be in the code example
// :hide-end:

... some more code for the code example ...
// :code-block-end:
```

where _id_ is the name of the resulting code example when you run Bluehawk.

### Extract to Literalincludes

This project uses [Bluehawk](https://github.com/mongodb-university/Bluehawk).
To extract the code examples, run:

```bash
bluehawk -s Examples/ManageEmailPasswordUsers.swift -d ../../source/examples/generated
```

to output the example blocks to the `source/examples/generated/` directory. Run this on all of the files in `Examples/`.

Bluehawk currently generates a lot of files, but we care about those in `/source/examples/generated/code/start/`:

```
ManageEmailPasswordUsers.codeblock.reset-password.swift
ManageEmailPasswordUsers.codeblock.confirm-new-user-email.swift
ManageEmailPasswordUsers.codeblock.register-email.swift
```

These files correspond to the `:code-block-start:` commands in `Examples/ManageEmailPasswordUsers.swift`.

### Include in Docs Source

Now you can update `source/ios/manage-email-password-users.txt` to use these code examples:

```rst
Register a New User Account
---------------------------

.. tabs-realm-languages::

   .. tab::
      :tabid: swift

      .. literalinclude:: /examples/generated/code/start/ManageEmailPasswordUsers.codeblock.register-email.swift
         :language: swift

   .. tab::
      :tabid: objective-c

      .. literalinclude:: /examples/generated/code/start/ManageEmailPasswordUsers.codeblock.register-email-objc.m
         :language: objective-c

...
```

Behold! You have pasted your unit tested code examples directly into the docs.
Rejoice!

## Questions

Please direct questions or support requests to #docs-realm or
@developer-education-team on Slack.
