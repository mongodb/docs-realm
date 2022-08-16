.. _web-quickstart-install:

Install the Web SDK
-------------------

.. tabs::
   
   .. tab:: npm
      :tabid: npm
      
      .. code-block:: shell
         
         npm install realm-web
   
   .. tab:: yarn
      :tabid: yarn
      
      .. code-block:: shell
         
         yarn add realm-web
   
   .. tab:: CDN
      :tabid: CDN
      
      Add a ``<script>`` tag to the ``<head>`` of your HTML file to load
      the Realm Web SDK as a global variable from a content delivery
      network.
      
      Use the most recent version:

      .. code-block:: html
         
         <script src="https://unpkg.com/realm-web/dist/bundle.iife.js"></script>
      
      Or import a specific version:

      .. code-block:: html
         
         <script src="https://unpkg.com/realm-web@1.5.1/dist/bundle.iife.js"></script>