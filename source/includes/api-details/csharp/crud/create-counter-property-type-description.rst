Traditionally, you would implement a counter by reading a value, incrementing 
it, and then setting it (``myObject.Counter += 1``). This does not work well in 
an asynchronous situation like when two clients are offline. Consider 
the following scenario:

- The SDK object has a ``counter`` property of type ``int``. It is currently 
  set to a value of ``10``.

- Clients 1 and 2 both read the ``counter`` property (``10``) and each increments 
  the value by ``1``.

- When each client regains connectivity and merges their changes, they expect a 
  value of 11, and there is no conflict. However, the counter value should be 
  ``12``!

When using a ``RealmInteger``, however, you can call the ``Increment()`` and 
``Decrement()`` methods, and to reset the counter, you set it to ``0``, just as 
you would an ``int``.

.. important::

   When you reset a ``RealmInteger``, you may run into the offline merge issue 
   described above.
