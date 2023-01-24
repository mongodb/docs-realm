auto relative_realm_path_directory = "custom_path_directory/";
// Construct a path
std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
// Add a name for the realm file
path =  path.append("dog_objects");
// Add the .realm extension
path = path.replace_extension("realm");
// Open a realm at the path
auto realm = realm::open<Dog>({ path });
