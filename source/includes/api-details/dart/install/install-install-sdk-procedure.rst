.. procedure::

   .. step:: Create a Project

      To create a Dart project, run the following commands:

      .. code-block::

         dart create <app_name>
         cd <app_name>

      For more information, refer to Dart's `Get Started Guide
      <https://dart.dev/tutorials/server/get-started>`__ for standalone
      Dart command-line and server applications.

   .. step:: Add the SDK to the Project

      To add the SDK to your project, run the following command:

      .. code-block::

         dart pub add realm_dart

      This downloads the `realm_dart
      <https://pub.dev/packages/realm_dart>`__ package, and adds it to
      your project.

      In your ``pubspec.yaml`` file, you should see:

      .. code-block:: yaml
         :caption: pubspec.yaml

         dependencies:
           realm_dart: <latest_version>

      After the package is added, run the following command to install it:

      .. code-block::

         dart run realm_dart install

      This downloads and copies the required native binaries to the app
      directory.

.. include:: /includes/api-details/dart/install/install-update-package-version-description.rst
