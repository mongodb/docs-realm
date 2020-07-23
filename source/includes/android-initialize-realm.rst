Initialize Realm
----------------

Before you can use {+service-short+} in your app, you must
initialize the {+service-short+} library. Your application should
initialize {+service-short+} just once each time the application runs.

To initialize the {+service-short+} library, provide an Android
``context`` to the ``Realm.init()`` static function. You can provide
an Activity, Fragment, or Application ``context`` for initialization with no
difference in behavior. You can initialize the {+service-short+} library
in the ``onCreate()`` method of an `application subclass
<https://developer.android.com/reference/android/app/Application>`__ to
ensure that you only initialize {+service-short+} once each time the
application runs.

.. tabs-realm-languages::

   .. tab::
      :tabid: java
   
      .. code-block:: java

         Realm.init(this); // `this` is a Context, typically an Application or Activity
   
   .. tab::
      :tabid: kotlin

      .. code-block:: kotlin
   
         Realm.init(this) // `this` is a Context, typically an Application or Activity

.. admonition:: Register Your Application Subclass in the Android Manifest
   :class: note

   If you create your own ``Application`` subclass, you must add it to your
   application's ``AndroidManifest.xml`` to execute your custom
   application code. Setting the ``android.name`` property of your
   manifest's application definition instantiates your ``Application``
   subclass before any other class when the process for your application
   is created.
   
   .. code-block:: xml
      :emphasize-lines: 6

      <?xml version="1.0" encoding="utf-8"?>
      <manifest xmlns:android="http://schemas.android.com/apk/res/android"
         package="com.mongodb.example">

         <application
            android:name=".MyApplicationSubclass"
            ...
         />
      </manifest>