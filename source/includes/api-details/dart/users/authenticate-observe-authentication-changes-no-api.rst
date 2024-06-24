Dart does not provide a dedicated API to observe authentication changes. However,
you can check the user's :flutter-sdk:`state
<realm/User/state.html>`, whose value is an enum of type
:flutter-sdk:`UserState <realm/UserState.html>`. This can give you information
about whether the user is logged in, logged out, or removed from the device.
