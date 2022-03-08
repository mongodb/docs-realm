realm.Write(() =>
{
    realm.Remove(currentStat);
    currentPlayer.Stats.Remove(currentStat);
});
