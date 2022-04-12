.. _backend_20211202:

02 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Added ability to import dependencies :ref:`from the UI <add-external-dependencies>`.
- Deprecated :ref:`third party services <third-party-services>`. Third party services will be fully removed on December 1, 2022. 
- Renamed "Webhooks" to ":ref:`HTTPS Endpoints <https-endpoints>`".

.. _backend_20211118:

18 November 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Requests blocked by an application's :ref:`IP Access List <manage-ip-access>` no longer count towards billing.

.. _backend_20211006:

06 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Added the ability to configure an :ref:`IP Access List <realm-cli-accessList-create>`.
- Increased function :ref:`execution timeout <function-constraints>` from 90 seconds to 120 seconds.
- Added the ability to create apps with a Template Starter Application.
- {+service-short+} Events are now available to view on the :atlas:`Atlas Activity Feed </tutorial/activity-feed/>`.
  You can configure these events in the :atlas:`Atlas Alert Settings </configure-alerts/>`.

.. _backend_20210908:

08 September 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Increased :ref:`request limit <mongodb-service-limitations-request-traffic>` from 3000 requests per second to 5000 requests per second.
- Allows users to store non-{+service-short+} files in the {+service-short+}
  :ref:`app structure <app-configuration>`.
- Updates to documents that do not match an application's :ref:`schema <schemas>`
  can now enable {+sync+} for those documents.


.. _backend_20210825:

25 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Introduced the ability to export and re-deploy the most recent 25 deploys.

.. _backend_20210811:

11 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Support the option of sending events using :manual:`Extended JSON </reference/mongodb-extended-json/>`
  in :ref:`AWS EventBridge Triggers <aws-eventbridge>` to support sending additional data types such as
  ``Decimal128``.
- Display the generated data models in SDKs Data Models when :ref:`Development Mode <concept-development-mode>`
  is enabled for {+sync+}. 


.. _backend_20210728:

28 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Deprecated the :github:`Stitch JS SDK <mongodb/stitch-js-sdk>`.
- Released the :ref:`Trigger Preimages <preimages>` option for GA.

.. _backend_20210715:

15 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Improved usability of the Admin UI Dashboard.
- Released :ref:`mongodb-realm-cli 2.0 <realm-cli-quickstart>`.

.. _backend_20210702:

02 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Added :ref:`JWT Authentication <custom-jwt-authentication>` support for
  JWTs with multiple audiences.
- Introduced support for bi-directional :ref:`GitHub Autodeploy <deploy-github>`.
- Added the ability to link a Github repository on application create.

.. _backend_20210616:

16 June 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Introduced ability to link new data sources via :ref:`Github Autodeploy <deploy-github>`.

.. _backend_20210604:

04 June 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Improves performance of client requests to app servers.
- Fixes an issue where aggregation pipelines did not support the ``$set`` operator.
- Reduces "Invalid Session" logs.
