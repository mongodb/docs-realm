Before getting started, ensure your development environment
meets the following prerequisites:

- :android:`Android Studio <studio/index.html>` Bumblebee 2021.1.1 or higher.
- JDK 11 or higher.
- Kotlin Plugin for Android Studio, version 1.6.10 or higher.
- An Android Virtual Device (AVD) using a supported CPU architecture.

Additionally, Kotlin Multiplatform (KMP) for mobile projects require the following:

- `Kotlin Multiplatform Mobile (KMM) Plugin
  <https://kotlinlang.org/docs/mobile/kmm-plugin-releases.html#release-details>`__
  for Android Studio, version 0.3.1 or higher.
- A Kotlin Multiplatform (KMP) App created using the "Kotlin Multiplatform App"
  template in Android Studio. Follow the instructions in the
  `Kotlin Multiplatform documentation
  <https://kotlinlang.org/docs/mobile/create-first-app.html>`__.

For more details on setting up your KMP environment, refer to the `official
Kotlin Multiplatform for mobile
<https://kotlinlang.org/docs/multiplatform-mobile-setup.html>`__ documentation. To verify your
environment setup, follow Kotlin's `guide to checking your
environment
<https://kotlinlang.org/docs/multiplatform-mobile-setup.html#check-your-environment>`__.

.. tip:: Kotlin Plugin Version

   The Kotlin Multiplatform (KMP) ecosystem frequently changes. If you experience
   any issues installing the SDK, check your Kotlin Plugin version, since
   outdated plugins can lead to difficult to debug errors. To see which
   versions of the Kotlin Plugin are compatible with the SDK, refer to the
   `Kotlin SDK changelog <https://github.com/realm/realm-kotlin/blob/master/CHANGELOG.md>`__.

.. include:: /includes/api-details/kotlin/install/install-supported-target-environments-description.rst
