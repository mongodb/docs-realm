Overview
--------

Realm Query Language is a string-based query language to constrain 
searches when retrieving objects from a realm. SDK-specific methods pass queries 
to the Realm query engine, which retrives matching objects from the realm.

Queries evaluate a predicate for every 
object in the collection being queried. If the predicate resolves 
to ``true``, {+client-database+} includes the object in the results 
collection.

You can use Realm Query Language in most Realm SDKs with your SDK's filter 
or query methods. The Swift SDK is the exception, as it uses the 
:ref:`NSPredicate query API <ios-nspredicate-query>`. 
Some SDKs also support idiomatic APIs for querying realms in their language.

For further reading on SDK-specific methods for querying realms, select the tab
below for your SDK.

.. tabs::

   .. tab:: Java SDK
      :tabid: java

      - :ref:`Query Engine - Java SDK <java-client-query-engine>`
      - :ref:`Query with Realm Query Language - Java SDK <java-filter-with-realm-query-language>`

   .. tab:: Swift SDK
      :tabid: swift

      - :ref:`Filter Data - Swift SDK <ios-client-query-engine>`

   .. tab:: .NET SDK
      :tabid: dotnet

      - :ref:`Query Engine - .NET SDK <dotnet-client-query-engine>`

   .. tab:: Node.JS SDK
      :tabid: node

      - :ref:`Query Engine - Node.Js SDK <node-client-query-engine>`
      - :ref:`Filter Queries - Node.Js SDK <node-filter-queries>`

   .. tab:: React Native SDK
      :tabid: react-native

      - :ref:`Query Engine - React Native SDK <react-native-client-query-engine>`
      - :ref:`Filter Queries - React Native SDK <react-native-filter-queries>`

   .. tab:: Kotlin SDK
      :tabid: kotlin

      - :ref:`Realm Query Language - Kotlin SDK <kotlin-query-language>` 

   .. tab:: Flutter SDK
      :tabid: flutter

      - :ref:`Realm Query Language - Flutter SDK <flutter-query-language>`
      - :ref:`Filter & Sort Results - Flutter SDK <flutter-filter-results>`


You can also use Realm Query Language to browse for data in :ref:`Realm Studio 
<realm-studio>`.

Expressions
-----------

Filters consist of **expressions** in a predicate. An expression consists of
one of the following:

- The name of a property of the object currently being evaluated.
- An operator and up to two argument expression(s). For example, in the 
  expression ``A + B``, the entirety of ``A + B`` is an expression, but ``A``
  and ``B`` are also argument expressions to the operator ``+``. 
- A value, such as a string (``'hello'``) or a number (``5``).

.. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.predicate.js
   :language: javascript

Dot Notation
------------

When referring to an object property, you can use **dot notation** to refer
to child properties of that object. You can even refer to the properties of
embedded objects and relationships with dot notation.

For example, consider a query on an object with a ``workplace`` property that
refers to a Workplace object. The Workplace object has an embedded object
property, ``address``. You can chain dot notations to refer to the zipcode
property of that address: 

.. code-block:: javascript

   workplace.address.zipcode == 10012

Subqueries
----------

You can iterate through a collection property with another query using the
``SUBQUERY()`` predicate function. ``SUBQUERY()`` has the following signature:

.. code-block:: javascript

   SUBQUERY(<collection>, <variableName>, <predicate>)

- ``collection``: the name of the property to iterate through
- ``variableName``: a variable name of the current element to use in the subquery
- ``predicate``: a string that contains the subquery predicate. You can use the
  variable name specified by ``variableName`` to refer to the currently-iterated
  element.

A subquery iterates through the given collection and checks the given
predicate against each object in the collection. The predicate may refer
to the current iterated object with the variable name passed to
``SUBQUERY()``.

A subquery expression resolves to an array. {+client-database+} only
supports the ``@count`` :ref:`aggregate operator
<rql-aggregate-operators>` on this result. This allows you to count how
many objects in the subquery input collection matched the predicate.

You can use the count of the subquery result as you would any other
number in a valid expression. In particular, you can compare the count
with a number literal (such as ``0``) or another property (such as
``quota``).

.. example::

   The following example shows two filters on a ``projects`` collection.
   
   - The first returns projects with tasks that have not been completed by a user named Alex.
   - The second returns the projects where the number of completed tasks is greater than or equal to the project's quota value.

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.subquery.js
      :language: javascript

.. note:: About the Examples On This Page

   The examples in this page use a simple data set for a task list app.
   The two Realm object types are ``Project`` and ``Task``. A ``Task``
   has a name, assignee's name, and completed flag. There is also an
   arbitrary number for priority -- higher is more important -- and a
   count of minutes spent working on it. A ``Project`` has zero or more
   ``Tasks`` and an optional quota for minimum number of tasks expected
   to be completed.

   See the schema for these two classes, ``Project`` and ``Task``, below:


.. tabs::


   .. tab:: Java SDK
      :tabid: java

      .. tabs-realm-languages::

         .. tab::
             :tabid: java 

             .. code-block:: java

               public class Task extends RealmObject {
                 ObjectId id = new ObjectId();
                 String name;
                 Boolean isComplete = false;
                 String assignee;
                 Integer priority = 0;
                 Integer progressMinutes = 0;
               } 
               public class Project extends RealmObject {
                 ObjectId id = new ObjectId();
                 String name;
                 RealmList<Task> tasks;
                 Integer quota = null;
               }

         .. tab::
            :tabid: kotlin

            .. code-block:: kotlin 

               open class Task(): RealmObject() {
                 var id: ObjectId = new ObjectId()
                 lateinit var name: String
                 var isComplete: Boolean = false
                 var assignee: String? = null
                 var priority: Int = 0
                 var progressMinutes: Int = 0
               }
               open class Project(): RealmObject() {
                 var id: ObjectId = new ObjectId()
                 lateinit var name: String
                 lateinit var tasks: RealmList<Task>
                 var quota: Int? = null
               }

   .. tab:: Swift SDK
      :tabid: swift

      .. code-block:: swift

         class Task {
             ObjectId id;
             string name;
             bool isComplete;
             string? assignee;
             int priority;
             int progressMinutes;
         }

         class Project {
             ObjectId id;
             string name;
             Task[] tasks;
             int? quota;
         }

   .. tab:: .NET SDK
      :tabid: dotnet

      .. literalinclude:: /examples/generated/dotnet/RqlSchemaExamples.codeblock.rql-schema-examples.cs
         :language: csharp

   .. tab:: Node.Js SDK
      :tabid: node

      .. literalinclude:: /examples/generated/node/rql-data-models.codeblock.rql-data-models.js
         :language: javascript

   .. tab:: React Native SDK
      :tabid: react-native

      .. literalinclude:: /examples/generated/node/rql-data-models.codeblock.rql-data-models.js
         :language: javascript

   .. tab:: Kotlin SDK
      :tabid: kotlin

      .. code-block:: kotlin

         class Task(): RealmObject {
           var id: Long = 0 // Kotlin SDK does not yet support ObjectId
           lateinit var name: String
           var isComplete: Boolean = false
           var assignee: String? = null
           var priority: Int = 0
           var progressMinutes: Int = 0
         }

         class Project(): RealmObject {
           var id: Long = 0 // Kotlin SDK does not yet support ObjectId
           lateinit var name: String
           lateinit var tasks: Array<Task>
           var quota: Int? = null
         }

   .. tab:: Flutter SDK
      :tabid: Flutter

      .. literalinclude:: /examples/generated/flutter/task_project_models_test.codeblock.task-project-models.dart
         :language: dart



Operators
---------

There are several types of operators available to query a
Realm collection. With these operators, you can:

- Compare values
- Perform logical evaluations
- Compare string values
- Aggregate collection properties
- Evaluate sets
- Sort and limit results

Comparison Operators
~~~~~~~~~~~~~~~~~~~~

The most straightforward operation in a search is to compare
values.

.. important:: Types Must Match

   The type on both sides of the operator must be equivalent. For
   example, comparing an ObjectId with string will result in a precondition 
   failure with a message like: 
   
   .. code-block::
      :copyable: false
   
      "Expected object of type object id for property 'id' on object of type 
      'User', but received: 11223344556677889900aabb (Invalid value)"
   
   You can compare any numeric type with any other numeric type,
   including decimal, float, and Decimal128.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Operator
     - Description

   * - ``between``
     - Evaluates to ``true`` if the left-hand numerical or date expression is between or equal to the right-hand range. For dates, this evaluates to ``true`` if the left-hand date is within the right-hand date range.

   * - | ``==``, ``=``
     - Evaluates to ``true`` if the left-hand expression is equal to the right-hand expression.

   * - | ``>``
     - Evaluates to ``true`` if the left-hand numerical or date expression is greater than the right-hand numerical or date expression. For dates, this evaluates to ``true`` if the left-hand date is later than the right-hand date.

   * - | ``>=``
     - Evaluates to ``true`` if the left-hand numerical or date expression is greater than or equal to the right-hand numerical or date expression. For dates, this evaluates to ``true`` if the left-hand date is later than or the same as the right-hand date.

   * - ``in``
     - Evaluates to ``true`` if the left-hand expression is in the right-hand list or string.

   * - | ``<``
     - Evaluates to ``true`` if the left-hand numerical or date expression is less than the right-hand numerical or date expression. For dates, this evaluates to ``true`` if the left-hand date is earlier than the right-hand date.

   * - | ``<=``
     - Evaluates to ``true`` if the left-hand numeric expression is less than or equal to the right-hand numeric expression. For dates, this evaluates to ``true`` if the left-hand date is earlier than or the same as the right-hand date.

   * - | ``!=``, ``<>``
     - Evaluates to ``true`` if the left-hand expression is not equal to the right-hand expression.

.. example::

   The following example uses the query engine's
   comparison operators to:

   - Find high priority tasks by comparing the value of the ``priority`` property value with a threshold number, above which priority can be considered high.
   - Find long-running tasks by seeing if the ``progressMinutes`` property is at or above a certain value.
   - Find unassigned tasks by finding tasks where the ``assignee`` property is equal to ``null``.
   - Find tasks within a certain time range by finding tasks where the ``progressMinutes`` property is between two numbers.

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.comparison-operators.js
      :language: javascript

Logical Operators
~~~~~~~~~~~~~~~~~

You can make compound predicates using logical operators.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Operator
     - Description

   * - | ``AND``
       | ``&&``
     - Evaluates to ``true`` if both left-hand and right-hand expressions are ``true``.

   * - | ``NOT``
       | ``!``
     - Negates the result of the given expression.

   * - | ``OR``
       | ``||``
     - Evaluates to ``true`` if either expression returns ``true``.

.. example::

   We can use the query language's logical operators to find
   all of Ali's completed tasks. That is, we find all tasks
   where the ``assignee`` property value is equal to 'Ali' AND
   the ``isComplete`` property value is ``true``:

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.logical-operators.js
      :language: javascript


String Operators
~~~~~~~~~~~~~~~~

You can compare string values using these string operators.
Regex-like wildcards allow more flexibility in search.

.. note::

   You can use the following modifiers with the string operators:

   - ``[c]`` for case insensitivity.

     .. code-block:: javascript

        "name CONTAINS[c] 'a'"

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Operator
     - Description

   * - | ``beginsWith``
     - Evaluates to ``true`` if the left-hand string expression begins with the right-hand string expression. This is similar to ``contains``, but only matches if the right-hand string expression is found at the beginning of the left-hand string expression.

   * - | ``in``
     - Evaluates to ``true`` if the left-hand string expression is found anywhere in the right-hand string expression.

   * - | ``contains``
     - Evaluates to ``true`` if the right-hand string expression is found anywhere in the left-hand string expression.

   * - | ``endsWith``
     - Evaluates to ``true`` if the left-hand string expression ends with the right-hand string expression. This is similar to ``contains``, but only matches if the left-hand string expression is found at the very end of the right-hand string expression.

   * - | ``like``
     - Evaluates to ``true`` if the left-hand string expression
       matches the right-hand string wildcard string
       expression. A wildcard string expression is a string
       that uses normal characters with two special wildcard
       characters:

       - The ``*`` wildcard matches zero or more of any character
       - The ``?`` wildcard matches any character.

       For example, the wildcard string "d?g" matches "dog",
       "dig", and "dug", but not "ding", "dg", or "a dog".

   * - | ``==``, ``=``
     - Evaluates to ``true`` if the left-hand string is lexicographically equal to the right-hand string.

   * - | ``!=``, ``<>``
     - Evaluates to ``true`` if the left-hand string is not lexicographically equal to the right-hand string.

.. example::

   We use the query engine's string operators to find:

   - Projects with a name starting with the letter 'e'
   - Projects with names that contain 'ie'

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.string-operators.js
      :language: javascript
