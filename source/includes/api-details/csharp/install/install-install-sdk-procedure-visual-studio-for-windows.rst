.. procedure::

   .. step:: Open the NuGet Package Manager

      In the Solution Explorer, right-click your solution and
      select :guilabel:`Manage NuGet Packages for Solution...`
      to open the NuGet Package management window.

      .. figure:: /images/vs-win-nuget.png
         :alt: Open the NuGet Package management window.
         :lightbox:

   .. step:: Add the Realm Package


      In the search bar, search for **Realm**. Select the
      result and click :guilabel:`Install`. When prompted,
      select all projects and click :guilabel:`Ok`.

      .. figure:: /images/vs-win-nuget-search.png
         :alt: Search for Realm and add it to your project(s).
         :lightbox:

.. step:: Add the Realm Weaver to FodyWeavers.xml

   .. include:: /includes/add-realm-fody-weaver.rst
    