- :ref:`sdks-unity`

Apple Privacy Manifest
~~~~~~~~~~~~~~~~~~~~~~

When building for Apple platforms, Apple requires any apps or third-party SDKs
that use *required reasons APIs* to provide a privacy manifest. The manifest
contains details about the app's or SDK's data collection and use practices,
and it must be included when submitting new apps or app updates to the Apple
App Store.

Some of the SDK language and framework libraries provide a privacy manifest to
streamline this process. The .NET library does not provide a privacy manifest.
If your application is a cross-platform app that you intend to submit to the
Apple App Store, you may be required to provide your own version of this
privacy manifest.

For details, refer to :ref:`sdks-apple-privacy-manifest`.
