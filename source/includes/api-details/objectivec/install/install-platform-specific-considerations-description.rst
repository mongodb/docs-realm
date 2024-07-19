- :ref:`sdks-build-for-apple`
- :ref:`sdks-tvos`

Apple Privacy Manifest
~~~~~~~~~~~~~~~~~~~~~~

Apple requires any apps or third-party SDKs that use *required reasons APIs*
to provide a privacy manifest. The manifest contains details about the app's
or SDK's data collection and use practices, and it must be included when
submitting new apps or app updates to the Apple App Store.

The Swift and Objective-C libraries provide a privacy manifest to streamline
this process.

To include these manifests in a build target that uses ``Realm``, you must
build ``Realm`` as a dynamic framework. For details, refer to the Swift
Package Manager Installation instructions step
**(Optional) Build RealmSwift as a Dynamic Framework**.

For additional details, refer to :ref:`sdks-apple-privacy-manifest`.
