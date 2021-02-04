bool ignoreCase = true;

var tasksThatStartWithE = tasks.Where(t => t.Name.StartsWith("E",
    ignoreCase, CultureInfo.CurrentCulture));

var tasksNamesWithIe = tasks.Where(t => t.Name.Contains("ie",
    StringComparison.OrdinalIgnoreCase));
