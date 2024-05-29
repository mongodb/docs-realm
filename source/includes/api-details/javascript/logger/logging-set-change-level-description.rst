To set the level of detail reported by the Node.js SDK pass a valid level to
:js-sdk:`Realm.setLogLevel() <classes/Realm-1.html#setLogLevel>`. Valid values
are:

- "all" 
- "trace" 
- "debug" 
- "detail" 
- "info" 
- "warn" 
- "error" 
- "fatal"
- "off"

.. note:: Performance and console.log()
  
  You should avoid using ``console.log()`` in production because it will negatively
  affect your app's performance. It can also be hard to account for all of the
  method's quirks in Node.js.

  For details about ``console.log()`` behavior, check out the `Node.js docs
  <https://nodejs.org/api/process.html#a-note-on-process-io>`__.
