**result**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult

Result of authentication hook operation. ``result.operation`` gives you
the name of the current operation. For a list of all operation names,
refer to the :realm-react-sdk:`API documentation 
<enums/AuthOperationName.html>`.

Possible result values:

.. code:: typescript

  {
    state, // "not-started", "pending", "success", "error"
    operation, // enum AuthOperationName
    pending, // true or false
    success, // true or false
    error // Error-based object or undefined
  }

**logIn(credentials: Realm.Credentials)**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   logIn(credentials: Realm.Credentials): void

Logs in a user with any authentication mechanism supported by
Realm. If called when a user is logged in, the current user switches to
the new user. Usually, it's better to use the more specific login
methods.

.. code:: typescript

  const {logIn, result} = useAuth();

  useEffect(() => logIn(Realm.Credentials.anonymous()), []);

  if(result.pending) {
    return (<LoadingSpinner/>)
  }

  if(result.error) {
    return (<ErrorComponent/>)
  }

  if(result.success) {
    return (<SuccessComponent/>)
  }
  //...

  *Parameters*

  ``credentials``. A Realm credential supplied by any supported Realm
  authentication.

  *Returns*

  void

**logInWithAnonymous()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   logInWithAnonymous(): void



**logInWithApiKey()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   logInWithApiKey(key: string): void



**logInWithEmailPassword()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   logInWithEmailPassword(credentials: {
     email: string;
     password: string;
   }): void



**logInWithJWT()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   logInWithJWT(token: string): void



**logInWithGoogle()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult



**logInWithApple()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult


]
**logInWithFacebook()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult



**logInWithFunction()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult



**logOut()**

Type signature:

.. code:: typescript
   :copyable: false
   :caption: Type signature

   result: AuthResult



