The Java SDK does not have the ability to delete users through the SDK. 
You can delete users from the server using the :ref:`App Services 
Admin API <admin-api>` ``delete a user`` endpoints. You could optionally 
create an :ref:`Atlas Function <functions>` that uses the Admin API to 
delete a user, and :ref:`call the function from the SDK <sdks-call-function>`.
