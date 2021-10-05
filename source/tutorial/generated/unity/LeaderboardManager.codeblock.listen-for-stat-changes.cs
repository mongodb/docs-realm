// SetStatListener sets a listener on all Stat objects, and calls
// SetNewlyInsertedScores if one has been inserted
private void SetStatListener()
{

    // Observe collection notifications. Retain the token to keep observing.
    listenerToken = realm.All<Stat>()
        .SubscribeForNotifications((sender, changes, error) =>
        {

            if (error != null)
            {
                // Show error message
                Debug.Log("an error occurred while listening for score changes :" + error);
                return;
            }

            if (changes != null)
            {
                SetNewlyInsertedScores(changes.InsertedIndices);
            }

        });
}
