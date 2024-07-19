If you are installing with `CocoaPods 
<https://guides.cocoapods.org/using/getting-started.html>`__, you need
CocoaPods 1.10.1 or later.

.. procedure::

   .. step:: Update the CocoaPods repositories

   On the command line, run ``pod repo update`` to ensure
   CocoaPods can access the latest available Realm versions.

   .. step:: Initialize CocoaPods for Your Project

      If you do not already have a Podfile for your project,
      run ``pod init`` in the root directory of your project to
      create a Podfile for your project. A Podfile allows you
      to specify project dependencies to CocoaPods.

   .. step:: Add the SDK as a Dependency in Your Podfile

      Add a ``use_frameworks!`` line to your Podfile if it is not
      already there.

      Add the line ``pod 'Realm', '~>10'`` to your main and test
      targets.

      When done, your Podfile should look similar to this:

      .. code-block::
         :emphasize-lines: 8

         platform :ios, '12.0'

         target 'MyDeviceSDKProject' do
         # Comment the next line if you don't want to use dynamic frameworks
         use_frameworks!

         # Pods for MyDeviceSDKProject
         pod 'Realm', '~>10'

         target 'MyRealmProjectTests' do
         inherit! :search_paths
         # Pods for testing
         pod 'Realm', '~>10'
         end

   .. step:: Install the Dependencies

      From the command line, run ``pod install`` to fetch the
      dependencies.

   .. step:: Use the CocoaPods-Generated ``.xcworkspace`` File

      CocoaPods generates an ``.xcworkspace`` file for you. This
      file has all of the dependencies configured. From now on,
      open this file -- not the ``.xcodeproj`` file -- to work
      on your project.

Resolve Build Issues
~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/api-details/swift/install/install-resolve-build-issues-cocoapods.rst
