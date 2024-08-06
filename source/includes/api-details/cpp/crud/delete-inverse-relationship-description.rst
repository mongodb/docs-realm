In this example, a ``Person`` has a to-one relationship to a ``Dog``,
and the ``Dog`` has an inverse relationship to ``Person``.
Setting the ``Person.dog`` relationship to ``nullptr`` removes the inverse
relationship from the ``Dog`` object. 
