You can check the user's state by calling the :java-sdk:`User.getState()
<io/realm/mongodb/User.html#getState()>` method. This
property's value is a :java-sdk:`User.State
<io/realm/mongodb/User.State.html>` enum whose values indicate
whether the user is ``LOGGED_IN``, ``REMOVED``, or ``LOGGED_OUT``.
