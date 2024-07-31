.. procedure::

   .. step:: Add the SDK to the Project

      1. Add the following to your app-level Gradle build file, typically found at :file:`<project>/app/build.gradle`:

         - Add :file:`io.realm.kotlin` to the list of plugins.
         - Add the following to the list of dependencies:

           - Add :file:`io.realm.kotlin:library-base` to the dependencies block.
           - If using Device Sync in your application, add :file:`io.realm.kotlin:library-sync` to the dependencies block.

         - To use coroutines with the SDK, add :file:`org.jetbrains.kotlinx:kotlinx-coroutines-core` to the list of dependencies.

         .. code-block::
            :caption: App build.gradle
            :emphasize-lines: 5, 18-22

            plugins {
                kotlin("multiplatform")
                kotlin("native.cocoapods")
                id("com.android.library")
                id("io.realm.kotlin") version "{+kotlin-sdk-version+}"
            }

            version = "1.0"

            kotlin {
                android()
                iosX64()
                iosArm64()

                sourceSets {
                    val commonMain by getting {
                        dependencies {
                            implementation("io.realm.kotlin:library-base:{+kotlin-sdk-version+}")
                            // If using Device Sync
                            implementation("io.realm.kotlin:library-sync:{+kotlin-sdk-version+}")
                            // If using coroutines with the SDK
                            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:{+kotlinx-coroutines-version+}")
                        }
                    }
                }
            }

      2. If you use any part of the SDK inside the Android module, add the following compile-time dependencies to your module-level Gradle build file, typically found at :file:`<project>/module/build.gradle`:

         .. code-block::
            :caption: Android Module build.gradle

            dependencies {
                compileOnly("io.realm.kotlin:library-base:{+kotlin-sdk-version+}")
            }
            // If using Device Sync
            dependencies {
                compileOnly("io.realm.kotlin:library-sync:{+kotlin-sdk-version+}")
            }

   .. step:: Sync Gradle Files

      After updating the Gradle configuration,
      resolve the dependencies by clicking :guilabel:`File` >
      :guilabel:`Sync Project with Gradle Files` in the Android Studio menu bar.
      You can now use the SDK in your application.
