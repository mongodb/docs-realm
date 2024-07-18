When developing with Xcode, you can use Swift Package Manager (SPM) to
install the SDK's ``realm-cpp`` library.

.. procedure::

   .. step:: Add Package Dependency

      In Xcode, select ``File`` > ``Add Packages...``.

   .. step:: Specify the Repository

      Copy and paste the following into the search/input box.

      .. code-block::

         https://github.com/realm/realm-cpp

   .. step:: Select the Package Products

      Under :guilabel:`Package Product`, select ``realm-cpp-sdk``. Under
      :guilabel:`Add to Target`, select the target you would like to add
      the SDK to. For example, the target might be the main executable of
      your app. Click :guilabel:`Add Package`.
