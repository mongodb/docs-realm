.. code-block:: typescript

       // Find items where no project that references the item
       // has a quota greater than 10.
       "NONE @links.Project.items.quota > 10"

       // Find items where all projects that reference the item
       // have a quota less than 5.
       "ALL @links.Project.items.quota < 5"

       // Find items that are referenced by multiple projects.
       "projects.@count > 1"

       // Find items that are not referenced by any project.
       "@links.Project.items.@count == 0"

       // Find items that belong to a project where the average item has
       // been worked on for at least 10 minutes
       "@links.Project.items.items.@avg.progressMinutes > 10"

       // Find items that are not referenced by another
       // object of any type (backlink count is 0).
       "@links.@count == 0"
