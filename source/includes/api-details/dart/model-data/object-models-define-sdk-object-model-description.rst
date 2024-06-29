1. Create Generated File Part Directive

   .. versionchanged:: v2.0.0
      Generated files are named ``.realm.dart`` instead of ``.g.dart``

   Add a part directive to include the ``RealmObject`` file that you generate in step 4
   in the same package as the file you're currently working on.

   .. literalinclude:: /examples/generated/flutter/schemas.snippet.part-directive.dart
      :language: dart
      :caption: modelFile.dart

2. Create a ``RealmModel``.

   Create the model for your SDK object type.
   You must include the annotation `RealmModel <https://pub.dev/documentation/realm_common/latest/realm_common/RealmModel-class.html>`__
   at the top of the class definition.

   You'll use the ``RealmModel`` to generate the public ``RealmObject``
   used throughout the application in step 4.

   You can make the model private or public. We recommend making
   all models private and defining them in a single file.
   Prepend the class name with an underscore (``_``) to make it private.

   If you need to define your schema across multiple files,
   you can make the ``RealmModel`` public. Prepend the name with a dollar
   sign (``$``) to make the model public. You must do this to generate the
   ``RealmObject`` from the ``RealmModel``, as described in step 4.

   Add fields to the ``RealmModel``.
   You can add fields of any :ref:`supported data types <sdks-supported-data-types>`.
   Include additional behavior using :ref:`special object types
   <sdks-define-models-object-types>`.

   .. literalinclude:: /examples/generated/flutter/schemas.snippet.create-realm-model.dart
      :language: dart
      :caption: modelFile.dart

3. Generate a ``RealmObject``.

   .. versionchanged:: v2.0.0
         Generated files are named ``.realm.dart`` instead of ``.g.dart``

   Generate the ``RealmObject``, which you'll use in your application:

   .. tabs::

      .. tab:: Flutter
         :tabid: flutter

         .. code-block::

            dart run realm generate

      .. tab:: Dart
         :tabid: dart

         .. code-block::

            dart run realm_dart generate

   This command generates the file in the same directory as your model file.
   It has the name you specified in the part directive of step 2.

   .. tip:: Track the generated file

      Track the generated file in your version control system, such as git.

   .. example:: File structure after generating model

      .. code-block::

         .
         ├── modelFile.dart
         ├── modelFile.realm.dart // newly generated file
         ├── myapp.dart
         └── ...rest of application

4. Use the ``RealmObject`` in your application code.

   Use the ``RealmObject`` that you generated in the previous step in your
   application code. Since you included the generated file as part of the same
   package where you defined the ``RealmModel`` in step 2, access the
   ``RealmObject`` by importing the file with the ``RealmModel``.
