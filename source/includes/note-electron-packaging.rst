.. note:: 

    Current React Native binaries are included in the ``realm`` package. 
    When you're using ``electron-builder``, you might want to remove 
    the ``react-native`` folder from the build by adding the following 
    entry to the ``build.files`` of your ``package.json``: ``"!**/node_modules/realm/react-native"``