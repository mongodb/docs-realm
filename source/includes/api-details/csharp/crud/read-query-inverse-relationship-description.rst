To query an inverse relationship in C#, you cannot use LINQ. Instead, pass a
string predicate using RQL. The following example shows how you could find
all Users who have Items that contain the word "oscillator".
