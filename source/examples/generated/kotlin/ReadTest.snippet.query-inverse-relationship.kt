// Query the parent object to access the child objects
val user = query<User>("name == $0", "Kermit").find().first()
val myFirstPost = user.posts[0]

// Iterate through the backlink collection property
user.posts.forEach { post ->
    Log.v("${user.name}'s Post: ${post.date} - ${post.title}")
}

// Query the backlink with `@links.<ObjectType>.<PropertyName>`
val oldPostsByKermit = realm.query<Post>()
    .query("@links.User.posts.name == $0 AND date < $1", "Kermit", today)
    .find()

// Query the child object to access the parent
val post1 = query<Post>("title == $0", "Forest Life").find().first()
val post2 = query<Post>("title == $0", "Top Ponds of the Year!").find().first()
val parent = post1.user.first()
