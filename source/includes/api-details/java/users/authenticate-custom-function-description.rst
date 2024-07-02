To log in with custom function authentication, create a credential by calling 
``Credentials.customFunction()``. The :java-sdk:`customFunction()
<io/realm/mongodb/Credentials.html#customFunction-Document->` method expects a 
Document that contains the properties and values used by the Atlas auth function. 
For example, suppose the backend function expects the input parameter to include 
a field named ``username``, like this:

.. code-block:: js
   :copyable: false
   
   exports = async function(loginPayload) {
      const { username } = loginPayload;
      ...
   }

The document you pass to ``Credentials.customFunction()`` might look like this:

.. code-block:: java
   :copyable: false
   
   Document("username", "bob")

You then pass the generated credential to ``app.login()`` or ``app.loginAsync()``.
