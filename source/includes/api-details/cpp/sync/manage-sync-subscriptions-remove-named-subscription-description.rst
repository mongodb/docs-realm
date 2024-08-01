You can remove a specific subscription by name using the ``remove()`` function
inside a ``subscription().updates()`` block. Removing a subscription by name
throws an error if the subscription does not exist, so you should check for a
subscription before removing it.
