
# Setting up your Environment

1. Install Visual Studio 2019 Community Edition.

2. Go to https://ci.realm.io/blue/organizations/jenkins/realm%2Frealm-dotnet/detail/PR-2011/48/artifacts/
   and download Realm.10.0.0-alpha.....nupkg and Realm.Fody.10.0.0-alpha.....nupkg.

3. Clone the ``mongodb/docs-realm`` repo.

4. Navigate to ``/examples/dotnet/`` and open ``dotnet.sln`` in Visual Studio.

   **NOTE:** You might need to update XCode -- the Xamarin code requires a specific version of the
   SDks. Visual Studio will tell you if this is the case.

5. In Visual Studio, expand ``dotnet``, expand ``Examples``, and then right-click
   on Dependencies.

   a. Click "Manage Nuget Packages".

   b. In the upper left corner is a drop-down that probably says "All Sources" or "nuget.org".
      In that dropdown, select "Configure Sources".

   c. Click the Add button (lower right).

   d. Give it a name (I did "Realm10"), and point the location to wherever you downloaded
      the two ``nupkg`` files earlier.

   e. When done, you should have 2 sources listed: nuget.org and the one you just
      created. Make sure both are selected and then click ``OK``.

   f. Back in the Manage Nuget Packages dialog, select your new source in the
      dropdown, and you should see your two packages. Select both, and confirm in the right
      pane that you are installing version 10.0.0-alpha.xyz where xyz is the latest version you downloaded.

   g. Click Add Packages.

At this point, you can run tests with one of the following:

- Run the "Examples - Unit Tests" target
- Run > Run Unit Tests
- Open a Unit Test file and press Cmd-T to run tests in that file
- Open the Unit Test explorer on the right-hand side of the IDE.
