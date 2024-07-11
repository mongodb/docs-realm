Use Google's official :google:`Sign-In for Android <identity/sign-in/android>` to authenticate Google
users in your Android application:

.. note:: Code Example Below

   For an implementation of these instructions, check out the code block
   below.

1. Add the Google Sign-In for Android dependency to the ``dependencies``
   block of your application level ``build.gradle``:

   .. code-block:: groovy
      :copyable: false

      com.google.android.gms:play-services-auth:19.2.0

#. Create a :google:`GoogleSignInOptions
   <android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions>`
   with the following builder options:

   - :google:`default sign in
     <android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder#public-builder-googlesigninoptions-googlesigninoptions>`
   - an :google:`ID token request
     <android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder#public-googlesigninoptions.builder-requestidtoken-string-serverclientid>`
     -- pass your OAuth 2.0 client ID as the ``serverClientId``.

#. Use the ``GoogleSignInOptions`` to create a ``GoogleSignInClient``
   with :google:`GoogleSignIn.getClient()
   <android/reference/com/google/android/gms/auth/api/signin/GoogleSignIn#getClient(android.content.Context,%20com.google.android.gms.auth.api.signin.GoogleSignInOptions)>`

#. Use the ``GoogleSignInClient`` to create an ``Intent`` capable of
   triggering Google Sign-In.

#. Use :android:`registerForActivityResult()
   <reference/androidx/activity/result/ActivityResultCaller#registerForActivityResult(androidx.activity.result.contract.ActivityResultContract%3CI,O%3E,androidx.activity.result.ActivityResultCallback%3CO%3E)>`
   to configure a callback. Your callback should use :google:`GoogleSignIn.getSignedInAccountFromIntent()
   <android/reference/com/google/android/gms/auth/api/signin/GoogleSignIn#getSignedInAccountFromIntent(android.content.Intent)>`
   to access the result of Google Sign-In: a ``Task<GoogleSignInAccount>``.

#. Use the :android:`launch()
   <reference/androidx/activity/result/ActivityResultLauncher#launch(I)>`
   method of the :android:`ActivityResultLauncher
   <reference/androidx/activity/result/ActivityResultLauncher>`
   returned in the previous step to start Google Sign-In. Pass the
   ``launch()`` method your Google Sign-In ``Intent``.

#. Use ``isSuccessful()`` to handle Google Sign-In errors.

#. Access the result of the task (a :google:`GoogleSignInAccount
   <android/reference/com/google/android/gms/auth/api/signin/GoogleSignInAccount>`)
   with ``getResult()``.

#. Access the ID token for the ``GoogleSignInAccount`` with ``getIdToken()``.

#. Create a Realm ``Credentials`` object with :java-sdk:`Credentials.google()
   <io/realm/mongodb/Credentials.html#google-java.lang.String-io.realm.mongodb.auth.GoogleAuthType->`.
   Pass the ID token as the first parameter, and :java-sdk:`GoogleAuthType.ID_TOKEN
   <io/realm/mongodb/auth/GoogleAuthType.html#ID_TOKEN>` as the second parameter.

#. Use the :java-sdk:`app.loginAsync()
   <io/realm/mongodb/App.html#loginAsync-io.realm.mongodb.Credentials-io.realm.mongodb.App.Callback->`
   or :java-sdk:`app.login() <io/realm/mongodb/App.html#login-io.realm.mongodb.Credentials->`
   methods to authenticate with the Atlas App Services backend using the token.

.. seealso::

   To learn more about Google Sign-In for Android, check out the
   official :google:`Google Sign-In for Android Integration Guide
   <identity/sign-in/android/start-integrating>`.

The following code implements this flow, starting with a method call to
``loginWithGoogle()``:
