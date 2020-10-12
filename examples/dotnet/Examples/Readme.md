
Setting up your Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Install Visual Studio 2019 Community Edition.

#. Go to https://ci.realm.io/blue/organizations/jenkins/realm%2Frealm-dotnet/detail/PR-2011/43/artifacts/
   and download Realm.10.0.0-alpha.43.nupkg and Realm.Fody.10.0.0-alpha.43.nupkg.

#. Clone the ``mongodb/docs-realm`` repo.

#. Navigtate to ``/examples/dotnet/`` and open ``dotnet.sln`` in Visual Studio.

   **NOTE:** You might need to update XCode -- the Xamarin code requires a specific version of the
   SDks. Visual Studio will tell you if this is the case.

#. In Visual Studio, expand ``dotnet``, expand ``Examples``, and then right-click
   on Dependencies.

   a. Click "Manqage Nuget Packages".

   #. In the upper left corner is a drop-down that probably says "All Sources".
      In that dropdown, select "Configure Sources".

   #. Click the Add button (lower right).

   #. Give it a name (I did "Realm10"), and point the location to wherever you downloaded
      the two ``nupkg`` files earlier.

   #. When done, you should have 2 sources listed: nuget.org and the one you just
      created. Make sure both are selected and then click ``OK``.

   #. Back in the Manage Nuget Packages dialog, select your new source in the
      dropdown, and your should see your two packages. Select botyh, and confirm in the right
      pane that you are installing version 10.0.0-alpha.43.

   #. Click Add Packages.

At this point, you should be ready to test things. There are currently 2 UnitTest files:

- Examples.cs has the Realm unit tests

- MongoDbExamples.cs has the unit tests specific to the MongoDB driver stuff.

As of this writing, all tests in Examples.cs are passing, while all tests in
MongoDbExamples are failing. I'm working on the latter right now.




