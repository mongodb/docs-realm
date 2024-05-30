Before you can use the SDK in your app, you must
initialize the Realm library. Your application should
initialize the SDK just once each time the application runs.

To initialize the Realm library, provide an Android
``context`` to the ``Realm.init()`` static function. You can provide
an Activity, Fragment, or Application ``context`` for initialization with no
difference in behavior. You can initialize the library
in the ``onCreate()`` method of an `application subclass
<https://developer.android.com/reference/android/app/Application>`__ to
ensure that you only initialize the SDK once each time the
application runs.

.. tip:: Register Your Application Subclass in the Android Manifest
   
   If you create your own ``Application`` subclass, you must add it to your
   application's ``AndroidManifest.xml`` to execute your custom
   application logic. Set the ``android.name`` property of your manifest's
   application definition to ensure that Android instantiates your ``Application``
   subclass before any other class when a user launches your application.
   
   .. code-block:: xml
      :emphasize-lines: 6
      :copyable: false

      <?xml version="1.0" encoding="utf-8"?>
      <manifest xmlns:android="http://schemas.android.com/apk/res/android"
         package="com.mongodb.example">

         <application
            android:name=".MyApplicationSubclass"
            ...
         />
      </manifest>
