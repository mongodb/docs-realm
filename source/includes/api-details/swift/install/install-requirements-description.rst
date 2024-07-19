Before getting started, ensure your development environment
meets the following prerequisites:

- Your project uses an Xcode version and minimum OS version that the library
  supports. Refer to **Supported Target Environments** on this page for more
  details.
- Reflection is enabled in your project. The Swift SDK uses reflection to
  determine your model's properties. Your project must not set
  ``SWIFT_REFLECTION_METADATA_LEVEL = none``, or the SDK cannot see properties
  in your model. Reflection is enabled by default if your project does
  not specifically set a level for this setting.

.. include:: /includes/api-details/swift/install/install-supported-os-and-xcode-description.rst

App Download File Size
~~~~~~~~~~~~~~~~~~~~~~

The SDK should only add around 5 to 8 MB to your app's download
size. The releases we distribute are significantly larger because they
include support for the iOS, watchOS and tvOS simulators, some debug symbols,
and bitcode, all of which are stripped by the App Store automatically when
apps are downloaded.
