.. procedure::

   .. step:: Add Package Dependency

      In Xcode, select ``File`` > ``Add Packages...``.

   .. step:: Specify the Repository

      Copy and paste the following into the search/input box.

      .. code-block:: sh

         https://github.com/realm/realm-swift.git

   .. step:: Specify Options

      In the options for the ``realm-swift`` package, we recommend setting
      the ``Dependency Rule`` to ``Up to Next Major Version``,
      and enter the `current Swift library version
      <https://github.com/realm/realm-swift/releases>`__ . Then, click
      ``Add Package``.

   .. step:: Select the Package Products

      .. versionchanged:: 10.49.3
         Instead of adding both, only add one package.

      Select either ``RealmSwift`` or ``Realm``, then click ``Add Package``.

      - If you use *only* Objective-C APIs, add ``Realm``.
      - If you use Swift or Swift and Objective-C APIs, add ``RealmSwift``.

   .. step:: (Optional) Build Realm as a Dynamic Framework

      To use the Privacy Manifest supplied by the SDK, build ``Realm`` or
      ``RealmSwift`` as a dynamic framework. If you build the library as a
      static framework, you must supply your own Privacy Manifest.

      To build the library as a dynamic framework:

      1. In your project :guilabel:`Targets`, select your build target.
      2. Go to the :guilabel:`General` tab.
      3. Expand the :guilabel:`Frameworks and Libraries` element.
      4. For the ``Realm`` framework, change the
         :guilabel:`Embed` option from "Do Not Embed" to "Embed & Sign."

      Now, Xcode builds ``Realm`` dynamically, and can provide the
      SDK-supplied Privacy Manifest.
