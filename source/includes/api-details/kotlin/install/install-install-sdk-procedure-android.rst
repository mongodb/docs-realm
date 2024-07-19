.. procedure::

   .. step:: Add the SDK to the Project

      Add :file:`io.realm.kotlin`, specifying the library version and
      :file:`apply false`, to the list of plugins in your project-level Gradle
      build file, typically found at :file:`<project>/build.gradle`:

      .. code-block::
         :caption: Global build.gradle

         plugins {
              id 'io.realm.kotlin' version '{+kotlin-sdk-version+}' apply false
         }

      Add the following to your app-level Gradle build file, typically
      found at :file:`<project>/app/build.gradle`:

      - Add :file:`io.realm.kotlin` to the list of plugins.
      - Add the following to the list of dependencies:

        - Add :file:`io.realm.kotlin:library-base` to the dependencies block.
        - If using Device Sync in your application, add :file:`io.realm.kotlin:library-sync` to the dependencies block.

      - To use coroutines with the SDK, add :file:`org.jetbrains.kotlinx:kotlinx-coroutines-core` to the list of dependencies.

      .. code-block::
         :caption: Module build.gradle
         :emphasize-lines: 4, 12-16

         plugins {
              id 'com.android.application'
              id 'org.jetbrains.kotlin.android'
              id 'io.realm.kotlin'
         }

         android {
              // ... build configuration settings
         }

         dependencies {
              implementation 'io.realm.kotlin:library-base:{+kotlin-sdk-version+}'
              // If using Device Sync
              implementation 'io.realm.kotlin:library-sync:{+kotlin-sdk-version+}'
              // If using coroutines with the SDK
              implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:{+kotlinx-coroutines-version+}'
         }

   .. step:: Sync Gradle Files

      After updating the Gradle configuration,
      resolve the dependencies by clicking :guilabel:`File` >
      :guilabel:`Sync Project with Gradle Files` in the Android Studio menu bar.
      You can now use the SDK in your application.