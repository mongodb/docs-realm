.. code-block:: javascript

  const {
    Stitch,
    AnonymousCredential,
    UserPasswordCredential
  } = require("mongodb-stitch-server-sdk");
  
  Stitch.defaultAppClient.auth
  .loginWithCredential(new AnonymousCredential()) // log the user in anonymously
  .then(user => {
    console.log(`Logged in as anonymous user with id: ${user.id}`);
    user
      .linkWithCredential(
        new UserPasswordCredential("<username>", "<password>") // call user.linkWithCredential to link the anonymous identity (and it's data) to the account created with that username and password
      )
      .then(users => {
        console.error("accounts linked:\t", users);
      })
      .catch(err => {
        console.error("err occurred in linking:\t", err);
      });
  })
  .catch(console.error);
