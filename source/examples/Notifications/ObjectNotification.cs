var account = new Account();
realm.Write(() => realm.Add(account));
account.PropertyChanged += (sender, e) =>
{
    Debug.WriteLine($"New value set for {e.PropertyName}");
}

realm.Write(() => account.Balance = 10); // => "New value set for Balance"
