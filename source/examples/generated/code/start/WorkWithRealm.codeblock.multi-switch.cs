app.SwitchUser(aimee);
if (app.CurrentUser.Id == aimee.Id)
{
    Console.WriteLine($"Aimee is now the current user.");
}