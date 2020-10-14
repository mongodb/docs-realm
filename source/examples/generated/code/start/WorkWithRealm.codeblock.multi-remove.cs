await app.RemoveUserAsync(elvis);
var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
if (noMoreElvis == null)
{
    Console.WriteLine($"Elvis has left the application.");
}