- :ref:`sdks-build-for-apple`
- :ref:`sdks-tvos`

Swift Concurrency Support
~~~~~~~~~~~~~~~~~~~~~~~~~

The Swift SDK supports Swift's concurrency-related language features.
For best practices on using the Swift SDK's concurrency features, refer
to the documentation below.

Async/Await Support
```````````````````

.. include:: /includes/swift-async-await-support.rst

For more information about async/await support in the Swift SDK, refer
to :ref:`Swift Concurrency: Async/Await APIs <swift-async-await-apis>`.

Actor Support
`````````````

The Swift SDK supports actor-isolated realm instances. For more information,
refer to :ref:`swift-actor-isolated-realm`.

Apple Privacy Manifest
~~~~~~~~~~~~~~~~~~~~~~

Apple requires any apps or third-party SDKs that use *required reasons APIs*
to provide a privacy manifest. The manifest contains details about the app's
or SDK's data collection and use practices, and it must be included when
submitting new apps or app updates to the Apple App Store.

The Swift and Objective-C libraries provide a privacy manifest to streamline
this process.

To include these manifests in a build target that uses ``RealmSwift``, you must
build ``RealmSwift`` as a dynamic framework. For details, refer to the Swift
Package Manager Installation instructions step
**(Optional) Build RealmSwift as a Dynamic Framework**.

For additional details, refer to :ref:`sdks-apple-privacy-manifest`.
