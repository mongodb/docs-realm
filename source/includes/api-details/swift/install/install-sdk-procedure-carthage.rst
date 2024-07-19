If you are installing with `Carthage
<https://github.com/Carthage/Carthage#installing-carthage>`__, you need
Carthage 0.33 or later.

.. procedure::

   .. step:: Add the SDK as a Dependency in Your Cartfile

      Add the SDK as a dependency by appending the line ``github
      "realm/realm-swift"`` to your Cartfile.

      You can create a Cartfile or append to an existing one by
      running the following command in your project directory:

      .. code-block:: bash

         echo 'github "realm/realm-swift"' >> Cartfile

   .. step:: Install the Dependencies

      From the command line, run ``carthage update --use-xcframeworks``
      to fetch the dependencies.

   .. step:: Add the Frameworks to Your Project

      Carthage places the built dependencies in the ``Carthage/Build``
      directory.

      Open your project's ``xcodeproj`` file in Xcode. Go to
      the Project Navigator panel and click your application
      name to open the project settings editor. Select the
      :guilabel:`General` tab.

      In Finder, open the ``Carthage/Build/`` directory. Drag the
      ``RealmSwift.xcframework`` and ``Realm.xcframework`` files
      found in that directory to the :guilabel:`Frameworks,
      Libraries, and Embedded Content` section of your
      project's :guilabel:`General` settings.

      .. figure:: /images/carthage-add-frameworks.png
         :alt: Drag the xcframework files into the Xcode project.
         :lightbox:

Resolve Build Issues
~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/api-details/swift/install/install-resolve-build-issues-carthage.rst
