Prerequisites
-------------

- :android:`Android Studio <studio/index.html>` version 4.2.2 or higher.
- JDK 11 or higher
- Kotlin Plugin for Android Studio, version 1.5.20 or higher.
- `Kotlin Multiplatform Mobile (KMM) Plugin
  <https://kotlinlang.org/docs/mobile/kmm-plugin-releases.html#release-details>`__
  for Android Studio, version 0.2.6 or higher.
- A KMM App created using the "KMM Application" template in Android
  Studio. Follow the instructions in the `KMM documentation
  <https://kotlinlang.org/docs/mobile/create-first-app.html>`__.
- An Android Virtual Device (AVD) using either the :file:`x86_64` or
  :file:`arm64` architecture.

  .. important:: x86 Devices are not Compatible with the SDK

     The Kotlin SDK does not support :file:`x86` devices. Since :file:`x86`
     devices are the default option in Android Studio, you must create
     an :file:`x86_64` or :file:`arm64` device in AVD Manager to run applications
     that use the SDK. You can find images for compatible devices in
     AVD Manager. Follow these steps to create and use a compatible
     device:

     1. Open AVD Manager in Android Studio by selecting :guilabel:`Tools`
        > :guilabel:`AVD Manager`.
     #. Click the :guilabel:`Create Virtual Device` button.
     #. Select a phone, such as :guilabel:`Nexus 5`.
     #. Click the :guilabel:`Next` button.
     #. Navigate to the  :guilabel:`x86 Images` tab.
     #. Click the :guilabel:`Download` link next to an :file:`x86_64` device
        image, such as :file:`S / x86_64 / Android API S (Google Play)`.
     #. Click the :guilabel:`Finish` button to close the dialogue when the
        image finishes downloading.
     #. Click the :guilabel:`Next` button.
     #. Name your device and click the :guilabel:`Finish` button to add
        it to your list of virtual devices.
     #. At the top of your Android Studio window, select your compatible
        device in the AVD dropdown.

     You can track :file:`x86` support in :github:`this GitHub issue
     <realm/realm-kotlin/issues/109>`.
