// A library must create a module and set library = true. This will
// prevent the default module from being created.
// allClasses = true can be used instead of listing all classes in the library.
@RealmModule(library = true, allClasses = true)
class MyLibraryModule

// Library projects are therefore required to explicitly set their own module.
val libraryConfig = RealmConfiguration.Builder()
    .name("library.realm")
    .modules(MyLibraryModule())
    .build()

// Apps can add the library RealmModule to their own schema.
val config = RealmConfiguration.Builder()
    .name("app.realm")
    .modules(Realm.getDefaultModule(), MyLibraryModule())
    .build()