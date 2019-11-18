// Use [c] for case-insensitivity.
print("Projects that start with 'e': \(projects.filter("name BEGINSWITH[c] 'e'").count)");

print("Projects that contain 'ie': \(projects.filter("name CONTAINS 'ie'").count)");
