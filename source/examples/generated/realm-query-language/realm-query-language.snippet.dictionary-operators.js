  // Evaluates if there is a dictionary key with the name 'foo'
  "ANY dict.@keys == 'foo'"

  // Evaluates if there is a dictionary key with key 'foo' and value 'bar
  "dict['foo'] == 'bar'"

  // Evaluates if there is a dictionary key with key 'foo' and value 'bar
  "dict.@count > 1"

  // Evaluates if dictionary has property of type 'string'
  "ANY dict.@type == 'string'"

  // Evaluates if all the dictionary's values are integers
  "ALL dict.@type == 'int'"

  // Evaluates if dictionary does not have any values of type int
  "NONE dict.@type == 'int'"

  // ALL is implied. All have int values.
  "dict.@type == 'int'"
