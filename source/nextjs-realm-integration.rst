.. :

==============================
Use Next.js with Realm Web SDK
==============================

.. default-domain:: mongodb

This guide covers integrating the Realm Web SDK into a
Next.js application. The Realm Web SDK allows users to access
data from Atlas in web applications, such as those created using
Next.js with Atlas App Services. Next.js is a React framework that
handles app configuration and structure, and supports client-side,
server-side, and static rendering of your webapp. Each option
utilizes the Realm Web SDK differently:

- Client-side rendering allows you to link client Next.js code
  with the Atlas Serverless Backend through the Realm Web SDK to
  directly query MongoDB from the browser.
- Realm Web SDK is best used with Server-side Next.js to pre-render
  a page’s HTML on each request. When used with the Realm Web SDK, you
  can pull Atlas data directly on page load.
- You can use Next.js Static Rendering with the Realm Web SDK to fetch
  data from MondoDB Atlas and generate page HTML at build time.

This guide covers how to use the Realm Web SDK with Next.js client-side,
server-side, and static rendering.

Before You Begin
==============================


Before using this integration guide, you should:

- Be familiar with Next.js. Consider referring to the `Next.js documentation<https://nextjs.org/docs/getting-started>`.
- `Create an Atlas App Services backend application <https://www.mongodb.com/docs/atlas/app-services/manage-apps/create/create-with-ui/#std-label-create-a-realm-app>`.
- Create a Next.js app. If creating a Next.js application for the first time,
  consider referring to the `Next.js Tutorial <https://nextjs.org/learn/basics/create-nextjs-app>`.

Install the Realm Web SDK in Your Next.js App

This section shows you how to install the Realm Web SDK to use with your application.

.. include:: web-quickstart-install

For more information, see the `Realm Web Installation <https://www.mongodb.com/docs/realm/web/install/>`
documentation.

Add Authentication

Before you can query MongoDB from your app, you must initialize the
App Services client and authenticate a user. You can follow the steps
below to connect the Realm Web SDK to client-side Next.js.
In this example, we’re going to expose Realm authentication throughout
the app using React’s Context API. For additional ways to expose Realm
authentication throughout your application, refer to the Next.js
authentication documentation.

.. procedure::

.. step:: Create a context for Atlas App Services.

      Generate a new application template using `create-react-app
      <https://create-react-app.dev/>`__:

      .. literalinclude:: /examples/generated/web/AppServiesConext.snippet.app-services-context.js
        :language: javascript

.. step:: Create a Custom App Wrapper

      Create a custom ``App`` page wrapper that exposes the AppServices
      context to child components. Add the file ``pages/_app.js``.
      Include the Provider for your React Context.


      .. literalinclude:: /examples/generated/web/_app.snippet.custom-app-wrapper.js
         :language: javascript

.. step:: Log the User in

      Access the ``app`` instance from AppServicesContext, and use it to log a
      user in. Here, we’re going to do this automatically in the ``pages/index.js``
      file to authenticate the user when they arrive to your app.

        .. literalinclude:: /examples/generated/web/index.snippet.log-in-index-js.js
            :language: javascript

.. tip::

See Also: `Quick Start (React) <https://www.mongodb.com/docs/realm/web/react-web-quickstart/>`
