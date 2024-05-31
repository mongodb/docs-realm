.. code-block:: typescript

     // Find to-do items completed before today's date.
     "dateCompleted < $0", today

     // Find to-do items completed between the start of the year until today.
     "dateCompleted > $0 AND dateCompleted < $1", thisYear, today
