auto relative_realm_path = "custom_path_directory/";
// Construct a path, and then convert it to a string so you can append a name for the realm file
auto path = std::filesystem::current_path().append(relative_realm_path).string();
/* Add a name for the file. When you provide a path, the `db_config` 
 * constructor removes the last path element and makes that 
 * the realm file name. */
path = path + "dog_objects";
auto config = realm::db_config{ path = path };
auto realm = realm::open<Dog>(config);
