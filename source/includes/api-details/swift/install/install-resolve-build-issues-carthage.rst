Some developers experience build issues after installing the SDK via
CocoaPods or Carthage. Common causes of these issues include:

- Installation issues:

  - Initial install failed
  - Using an unsupported version of the dependency manager

- Build tool issues:

  - Build tools have stale caches
  - Updating build tool versions

- Making changes to your project setup, such as:

  - Adding a new target 
  - Sharing dependencies across targets

A fix that often clears these issues is to delete derived data 
and clean the Xcode build folder.

.. procedure::

   .. step:: Reset Carthage-managed Dependency State

      Run these commands in the terminal, in the root of your project:

      .. code-block::

         rm -rf Carthage
         # Assumes default DerivedData location:
         rm -rf ~/Library/Developer/Xcode/DerivedData
         carthage update

      .. important::

         This will update **all** of your Carthage-managed dependencies, not
         just Atlas Device SDK.

   .. step:: Clean the Xcode Build Folder

      With your project open in Xcode, go to the Product drop-down menu,
      and select Clean Build Folder.

      .. figure:: /images/xcode-clean-build-folder.png
         :alt: Select Product, then Clean Build Folder.
         :lightbox:
