struct Project {
  std::string name;
  std::vector<Item*> items;
};
REALM_SCHEMA(Project, name, items)
