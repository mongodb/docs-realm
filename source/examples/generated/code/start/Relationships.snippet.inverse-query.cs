var oscillatorAssignees = realm.All<User>()
    .Filter("Tasks.Text CONTAINS 'oscillator'").ToList();

foreach (User u in oscillatorAssignees)
{
    Console.WriteLine(u.Name);
}