.. procedure::

   .. step:: Download and Extract the Framework

      Download the `latest release of the Swift library
      <https://github.com/realm/realm-swift/releases>`__ and extract the zip.

   .. step:: Copy Framework(s) Into Your Project

      Drag ``Realm.xcframework`` and ``RealmSwift.xcframework`` (if using)
      to the File Navigator of your Xcode project. Select the
      :guilabel:`Copy items if needed` checkbox and press :guilabel:`Finish`.

      .. tip::

         If using the Objective-C API within a Swift project, we
         recommend you include both Realm Swift and Realm Objective-C in your
         project. Within your Swift files, you can access the Swift API and
         all required wrappers. Using the RealmSwift API in mixed
         Swift/Objective-C projects is possible because the vast majority of
         RealmSwift types are directly aliased from their Objective-C
         counterparts.
