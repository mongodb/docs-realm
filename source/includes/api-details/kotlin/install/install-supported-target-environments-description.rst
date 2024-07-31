Supported Target Environments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Kotlin Multiplatform (KMP) supports a wide range of application environments
Refer also to Kotlin's `Multiplatform Gradle DSL reference: Targets
<https://kotlinlang.org/docs/multiplatform-dsl-reference.html#targets>`__ documentation.

.. tabs::

   .. tab:: Supported Environments
      :tabid: kmp-supported-environments

      The Kotlin library supports the following environments:

      - :file:`android`

      - :file:`iosArm64`
      - :file:`iosSimulatorArm64`
      - :file:`iosX64`

      - :file:`jvm`

      - :file:`macosArm64`
      - :file:`macosX64`

   .. tab:: Unsupported Environments
      :tabid: kmp-unsupported-environments

      The Kotlin library does *not* support the following environments:

      - :file:`androidNativeArm32`
      - :file:`androidNativeArm64`
      - :file:`androidNativeX86`
      - :file:`androidNativeX64`

      - :file:`iosArm32`
 
      - :file:`js`

      - :file:`linuxArm32Hfp`
      - :file:`linuxArm64`
      - :file:`linuxMips32`
      - :file:`linuxMipsel32`
      - :file:`linuxX64`

      - :file:`mingwX64`
      - :file:`mingwX86`

      - :file:`tvosArm64`
      - :file:`tvosSimulatorArm64`
      - :file:`tvosX64`

      - :file:`wasm32`

      - :file:`watchosArm32`
      - :file:`watchosArm64`
      - :file:`watchosSimulatorArm64`
      - :file:`watchosX86`
      - :file:`watchosX64`

If you want to build for an environment that the Kotlin library does not
support, consider using one of the other libraries. For more information,
refer to these "Build for Platform" pages:

- :ref:`sdks-build-for-apple`
- :ref:`sdks-build-for-linux`
- :ref:`sdks-build-for-web`
