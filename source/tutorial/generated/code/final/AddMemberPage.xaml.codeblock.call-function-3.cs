var result = await App.RealmApp.CurrentUser.Functions.CallAsync("removeTeamMember", email.ToString());
