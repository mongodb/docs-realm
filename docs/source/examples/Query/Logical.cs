Debug.WriteLine("Ali's complete tasks: "
    + tasks.Where(t => t.Assignee == "Ali" && t.IsComplete));
