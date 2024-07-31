.. procedure::

   .. step:: Create a Node.js Project

      Create your Node.js project by creating a new directory
      for your project and running ``npm init`` in that
      directory. In the example below, replace ``MyApp``
      with your desired project name. Answer all of the prompts
      to fill out the details of your project.

      .. code-block::

         mkdir MyApp && cd MyApp && npm init

   .. step:: Install the SDK with NPM

      In your Node.js project directory, use the following command
      to add the SDK to your project:

      .. code-block::

         npm install realm

   .. step:: Enable TypeScript (optional)

      TypeScript is a superset of JavaScript that adds static
      type checking and other features intended to make
      application-scale development more robust. If you'd like
      to use TypeScript, follow the TypeScript team's official
      `Node Starter guide
      <https://github.com/Microsoft/TypeScript-Node-Starter#typescript--node>`__.
      The SDK supports TypeScript natively and integrates easily
      into a TypeScript project.
