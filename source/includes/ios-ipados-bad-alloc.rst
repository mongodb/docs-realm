In iOS or iPad devices with little available memory, or where you have a 
memory-intensive application that uses multiple realms or many notifications, 
you may encounter the following error:

.. code-block:: console
   :copyable: false

   libc++abi: terminating due to an uncaught exception of type std::bad_alloc: std::bad_alloc

This error typically indicates that a resource cannot be allocated because
not enough memory is available. 

If you are building for iOS 15+ or iPad 15+, you can add the 
:apple:`Extended Virtual Addressing Entitlement 
<documentation/bundleresources/entitlements/com_apple_developer_kernel_extended-virtual-addressing>`
to resolve this issue. 

Add these keys to your Property List, and set the values to ``true``:

.. code-block:: console

   <key>com.apple.developer.kernel.extended-virtual-addressing</key>
   <true/>
   <key>com.apple.developer.kernel.increased-memory-limit</key>
   <true/>
