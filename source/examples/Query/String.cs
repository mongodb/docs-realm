bool ignoreCase = true;
Debug.WriteLine("Projects that start with 'e': "
    + projects.Where(p => p.Name.StartsWith("E", ignoreCase, StringComparison.CurrentCulture)));

Debug.WriteLine("Projects that contain 'ie': "
    + projects.Where(p => p.Name.Contains("ie", StringComparison.OrdinalIgnoreCase)));
