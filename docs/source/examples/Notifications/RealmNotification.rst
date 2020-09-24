Suppose you are writing a real-time collaborative app. To
give the sense that your app is buzzing with collaborative
activity, you want to have an indicator that lights up when
any change is made. In that case, a realm notification
handler would be a great way to drive the code that controls
the indicator.

.. tabs-realm-languages::

   .. tab::
      :tabid: javascript

      .. literalinclude:: /examples/Notifications/RealmNotification.js
         :language: javascript
         :emphasize-lines: 6

   .. tab::
      :tabid: swift

      .. literalinclude:: /examples/Notifications/RealmNotification.swift
         :language: swift
         :emphasize-lines: 3

   .. tab::
      :tabid: c-sharp

      .. literalinclude:: /examples/Notifications/RealmNotification.cs
         :language: csharp
         :emphasize-lines: 2

   .. tab::
      :tabid: java

      .. literalinclude:: /examples/Notifications/RealmNotification.java
         :language: java
         :emphasize-lines: 16

   .. tab::
      :tabid: kotlin

      .. literalinclude:: /examples/Notifications/RealmNotification.kt
         :language: kotlin
         :emphasize-lines: 12

   .. tab::
      :tabid: objective-c

      .. literalinclude:: /examples/Notifications/RealmNotification.m
         :language: objective-c
         :emphasize-lines: 2
