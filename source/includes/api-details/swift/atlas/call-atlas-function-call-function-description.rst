To execute a function in Swift, use the ``functions`` object on the currently
logged-in user.

The ``functions`` object has dynamic members corresponding to functions.
In this case, ``functions.concatenate()`` refers to the ``concatenate`` 
function. Pass a ``BSONArray`` of arguments.

Async/Await
```````````

.. literalinclude:: /examples/generated/code/start/Functions.snippet.async-call-a-function.swift
   :language: swift

Completion Handler
``````````````````

The trailing closure is the completion handler to call when the function call
is complete. This handler is executed on a non-main global ``DispatchQueue``.
