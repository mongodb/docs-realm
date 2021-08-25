
.. _backend_20210825:

25 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Introduced ability to export and re-deploy the most recent 25 deploys.

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
- Released the :ref:`Trigger Preimages <trigger-preimages>` option for GA.

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
