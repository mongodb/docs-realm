// SetNewlyInsertedScores() determines if a new Stat is
// greater than any existing topStats, and if it is, inserts it into the
// topStats list in descending order
// SetNewlyInsertedScores() takes an array of insertedIndices
private void SetNewlyInsertedScores(int[] insertedIndices)
{
    foreach (var i in insertedIndices)
    {
        var newStat = realm.All<Stat>().ElementAt(i);

        for (var scoreIndex = 0; scoreIndex < topStats.Count; scoreIndex++)
        {
            if (topStats.ElementAt(scoreIndex).IsValid == true && topStats.ElementAt(scoreIndex).Score < newStat.Score)
            {
                if (topStats.Count > 4)
                {   // An item shouldn't be removed if the leaderboard has less than 5 items
                    topStats.RemoveAt(topStats.Count - 1);
                }
                topStats.Insert(scoreIndex, newStat);
                root.Remove(listView); // remove the old listView
                CreateTopStatListView(); // create a new listView
                root.Add(listView); // add the new listView to the UI
                break;
            }
        }
    }
}
