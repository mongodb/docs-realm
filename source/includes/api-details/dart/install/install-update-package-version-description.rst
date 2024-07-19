Update the Package Version
~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the version of the SDK in your project, perform the following steps:

.. procedure::

   .. step:: Update the ``pubspec.yaml`` File

      Update the package version in your :file:`pubspec.yaml` file dependencies.

      .. code-block:: yaml
         :caption: pubspec.yaml

         dependencies:
           realm_dart: <updated_version>

   .. step:: Install the Updated Package

      From the command line, run the following command to install the updated
      version:

      .. code-block::

         dart pub upgrade realm_dart

      Then, run the following command to install the updated SDK's native
      binaries:

      .. code-block::

         dart run realm_dart install

   .. step:: Regenerate Object Models

      Changes to the package version may affect the functionality of the object
      models. From the command line, run the following command to regenerate
      object models with new and updated functionality:

      .. code-block:: bash

         dart run realm_dart generate

      .. include:: /includes/flutter-v2-breaking-change.rst
