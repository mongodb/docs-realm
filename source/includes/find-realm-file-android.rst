You can get your {+realm+} file path with the
:java-sdk:`realm.getPath() <io/realm/Realm.html#getPath-->` method:

.. tabs-realm-languages::

   .. tab::
      :tabid: java

      .. literalinclude:: /examples/generated/android/local/RealmFileLocationTest.codeblock.get-realm-file-location.java
         :language: java

   .. tab::
      :tabid: kotlin

      .. literalinclude:: /examples/generated/android/local/RealmFileLocationTest.codeblock.get-realm-file-location.kt
         :language: kotlin

{+service-short+} Studio does not currently support accessing {+realm+}
files directly on device, so you need to copy your {+realm+} file from
your Android device to view it. You can access {+realm+} files on any
rooted device using
:android:`Android Debug Bridge (ADB) <studio/command-line/adb>` with
the following command:

.. code-block:: sh

   adb pull <realm-file-path> .

.. important:: File Access Limitations

   ``adb`` only works on emulators and rooted Android devices.

.. tip:: Find Realm Files in Android Studio Device File Explorer

   You can also find your application's {+realm+} files using Android
   Studio's :guilabel:`Device File Explorer`, found on the bottom right
   of the Android Studio IDE. Navigate to
   ``/data/data/your.package.name/files/``, right click on your {+realm+}
   file, and select :guilabel:`Save As` to copy the file from your
   Android device to your local file system.
