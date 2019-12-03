// Use [c] for case-insensitivity.
console.log(
  "Projects that start with 'e': " +
    projects.filtered("name BEGINSWITH[c] 'e'").length
);
console.log(
  "Projects that contain 'ie': " +
    projects.filtered("name CONTAINS 'ie'").length
);