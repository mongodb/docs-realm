// Query by the remapped name 'Blog_Author'
val postsByKermit = realm.query<Post>()
    .query("@links.Blog_Author.name == $0", "Kermit")
    .find()
