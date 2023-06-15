auto relative_realm_path_directory = "custom_path_directory/";
// Construct a path
std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
// Add a name for the realm file
path = path.append("employee_objects");
// Add the .realm extension
path = path.replace_extension("realm");
// Set the path on the config, and open a realm at the path
auto config = db_config();
config.set_path(path);
auto realmInstance = db(std::move(config));
