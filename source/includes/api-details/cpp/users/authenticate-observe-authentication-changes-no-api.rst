C++ does not provide a dedicated API to observe authentication changes. However,
you can check the user's :cpp-sdk:`state
<structrealm_1_1user.html#a51821add445bf8da874b2532c1010b5a>`, which is
an enum whose possible values are:

- ``logged_out``
- ``logged_in``
- ``removed``
