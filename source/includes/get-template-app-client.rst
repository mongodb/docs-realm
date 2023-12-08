After you have created a template app, you can get a Device SDK client
in a variety of programming languages and frameworks. Choose from:

- Flutter
- Kotlin
- MAUI
- React Native
- SwiftUI

.. tabs::
   
   .. tab:: Atlas App Services UI
      :tabid: ui
      
      When you download client code through the App Services UI, the client 
      code is not pre-populated with your App Services App ID. To use 
      one of these clients, you must :ref:`find your App ID <app-metadata>`
      to use in the client. Follow the :guilabel:`Configuration` and 
      :guilabel:`Download the Client as a Zip File` instructions in the client 
      :file:`README.md` to learn where to insert your App ID.

      **Download the client when you create the template app**

      When you create a template app using the App Services UI, the UI 
      prompts you with two options to get the client code immediately 
      after creating the template:

      - Download your preferred client as a ``.zip`` file.
      - Use the {+cli+} to pull your preferred client to a local directory.

      After selecting the ``.zip`` or {+cli+} method, follow the on-screen
      instructions to get the client code.
      
      **Download the client at some point after creating the template app**

      If you don't download the client code when you first create the app,
      you can download it later. Your App Services App 
      displays a "Welcome to Your Application" pane on the main dashboard. 
      This pane contains a button labeled :guilabel:`</> Pull front-end code`. 
      When you click this button, you see the same dialogue as when you 
      first create an app, which gives you the option to download the client 
      as a ``.zip`` or pull it with the {+cli+}.

   .. tab:: {+cli+}
      :tabid: cli

      When you download client code through {+cli+}, the client code is
      pre-populated with your App Services App ID.

      **Download the client when you create the template app**

      When you use {+cli+} to create the template app, it automatically
      creates a directory wherever you run :ref:`the create command 
      <appservices-apps-create>` that contains both the backend and client
      code. Alternately, you can use the ``--local`` option to specify a 
      directory where it should download the app code.
      
      .. code-block:: shell
         
         {+cli-bin+} apps create -n "<App Name>" --template "<Chosen Template App ID>"

      The directory name is the name of your app. Inside this directory,
      you'll see a ``backend`` directory that contains the App Services code,
      and a ``frontend`` directory that contains the client application code.

      **Download the client at some point after creating the template app**

      At any point after creating a template app, you can use the {+cli+}
      to download the client code. Use the :ref:`{+cli+} pull command 
      <appservices-pull>` with the ``--template`` option to specify which
      client template you want to download.

      .. code-block:: shell
         
         {+cli-bin+} pull --remote "<App Name>" --template "<Chosen Template App ID>"

      Use :ref:`the ID of an available template below <template-apps-list>` 
      that offers a client application.

   .. tab:: GitHub
      :tabid: github

      The Device Sync template app clients are available in GitHub. If you
      want just the client code without the backend code, explore the 
      relevant GitHub repository for your preferred framework or language:

      - :github:`Flutter Device Sync Client <mongodb/template-app-dart-flutter-todo>`
      - :github:`Kotlin Device Sync Client <mongodb/template-app-kotlin-todo>`
      - :github:`MAUI Device Sync Client <mongodb/template-app-maui-todo>`
      - :github:`React Native Device Sync Client <mongodb/template-app-react-native-todo>`
      - :github:`SwiftUI Device Sync Client <mongodb/template-app-swiftui-todo>`

      If you clone one of these repositories, the client code is not 
      pre-populated with your App Services App ID. To use one of these
      clients, you must :ref:`create a template app <create-template-app>` 
      and :ref:`find your App ID <app-metadata>` to use in the client.
      Follow the :guilabel:`Configuration` and :guilabel:`Cloning from GitHub` 
      instructions in the client :file:`README.md` to learn where to insert 
      your App ID.
