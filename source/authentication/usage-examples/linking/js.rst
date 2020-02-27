.. code-block:: javascript

  const {
    Stitch,
    AnonymousCredential,
    UserPasswordCredential
  } = require("mongodb-stitch-browser-sdk");

  Stitch.defaultAppClient.auth
    .loginWithCredential(new AnonymousCredential()) // log the user in anonymously
    .then(user => {
      console.log(`Logged in as anonymous user with id: ${user.id}`);
      // Link the anonymous identity (and its data) to the new email/password user
      return user.linkWithCredential(
        new UserPasswordCredential("<username>", "<password>")
      );
    })
    .catch(err => {
      console.error("Failed to link user: ", err);
    });
