// Find all the books with science fiction as the genre
var scienceFiction = realmFts.query<Book>("genre TEXT 'science fiction'").find()

// Find all the books with fiction but not science in the genre
var fictionNotScience = realmFts.query<Book>("genre TEXT 'fiction -science'").find()
