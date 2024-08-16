You can query a ``RealmAny`` field just like any other data type.
Operators that only work with certain types, such as :ref:`string
operators <java-string-operators>` and arithmetic operators, ignore
values that do not contain that type. Negating such operators matches
values that do not contain the type. Type queries match the underlying
type, rather than ``RealmAny``. Arithmetic operators convert numeric
values implicitly to compare across types.
