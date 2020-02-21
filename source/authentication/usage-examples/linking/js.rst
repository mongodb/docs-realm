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
        new UserPasswordCredential("jonsnow@mailinator.com", "Test123!") // call user.linkWithCredential to link the anonymous user with an already registered user/password user
      )
      .then(users => {
        console.error("accounts linked:\t", users);
      })
      .catch(err => {
        console.error("err occurred in linking:\t", err);
      });
  })
  .catch(console.error);
