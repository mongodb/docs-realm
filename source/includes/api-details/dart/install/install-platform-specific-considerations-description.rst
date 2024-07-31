- :ref:`macOS: Device Sync and App Sandbox Entitlements <sdks-macos-flutter-app-sandbox-entitlements>`

Apple Privacy Manifest
~~~~~~~~~~~~~~~~~~~~~~

When building for Apple platforms, Apple requires any apps or third-party SDKs
that use *required reasons APIs* to provide a privacy manifest. The manifest
contains details about the app's or SDK's data collection and use practices,
and it must be included when submitting new apps or app updates to the Apple
App Store.

Some of the SDK language and framework libraries provide a privacy manifest to
streamline this process. Starting in version 2.2.0, the Dart and Flutter
libraries provide a privacy manifest.

For details, refer to :ref:`sdks-apple-privacy-manifest`.
