using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using Realms;
using System.Linq;
// :code-block-start: add-sync-variables-leaderboard-manager
// :state-uncomment-start: sync
using Realms.Sync;
using System.Threading.Tasks;
// :state-uncomment-end:
// :code-block-end:

public class LeaderboardManager : MonoBehaviour
{
    private Realm realm;
    private IDisposable listenerToken;
    public ListView listView;
    public Label displayTitle;
    public int currentPlayerHighestScore = 0; // 0 til it's set
    public string username;
    public bool isLeaderboardGUICreated = false;
    public static LeaderboardManager Instance;
    public int maximumAmountOfTopStats;
    public List<Stat> topStats;
    public VisualElement root;

    void Awake()
    {
        Instance = this;
    }
    // :code-block-start: sync-open-realm-in-leaderboard
    // :state-uncomment-start: sync
    // public static async Task<Realm> GetRealm()
    // {
    //     var syncConfiguration = new SyncConfiguration("UnityTutorialPartition", RealmController.syncUser);
    //     return await Realm.GetInstanceAsync(syncConfiguration);
    // }
    // :state-uncomment-end:
    // :code-block-end:
    // :code-block-start: set-logged-in-user-leaderboard-ui
    // :state-start: start local
    public void setLoggedInUser(string userInput)
    // :state-end:
    // :state-uncomment-start: sync
    // public async void setLoggedInUser(string userInput)
    // :state-uncomment-end:
    {
        username = userInput;

        // :state-start: start local
        realm = Realm.GetInstance();
        // :state-end:
        // :state-start: sync
        realm = await GetRealm();
        // :state-end:

        // only create the leaderboard on the first run, consecutive restarts/reruns will already have a leaderboard created
        if (isLeaderboardGUICreated == false)
        {
            root = GetComponent<UIDocument>().rootVisualElement;
            createLeaderboardUI();
            root.Add(displayTitle);
            root.Add(listView);
            setStatListener(); // start listening for score changes once the leaderboard GUI has launched
            isLeaderboardGUICreated = true;
        }
    }
    // :code-block-end:

    public int getRealmPlayerTopStat()
    {
        // :code-block-start: get-current-player-top-score
        // :state-start: start
        // TODO: Query the realm instance for the current player, find the current player's top score and return that value
        // :state-uncomment-start: start
        //  return 0;
        // :state-uncomment-end:
        // :state-end:
        // :state-start: sync local     
        var realmPlayer = realm.All<Player>().Where(p => p.Name == username).First();
        var realmPlayerTopStat = realmPlayer.Stats.OrderByDescending(s => s.Score).First().Score;
        return realmPlayer.Stats.OrderByDescending(s => s.Score).First().Score;
        // :state-end:
        // :code-block-end:
    }
    void createLeaderboardUI()
    {
        // create leaderboard title
        displayTitle = new Label();
        displayTitle.text = "Leaderboard:";
        displayTitle.AddToClassList("display-title");

        // :code-block-start: get-highest-scores-global-leaderboard
        // :state-start: start
        // TODO: Query the realm instance for all stats, and order by the highest scores to the lowest scores
        // :state-end:
        // :state-start: sync local
        topStats = realm.All<Stat>().OrderByDescending(s => s.Score).ToList();
        // :state-end:
        // :code-block-end:
        createTopStatListView();
    }
    public void createTopStatListView()
    {
        if (topStats.Count > 4)
        {
            maximumAmountOfTopStats = 5;
        }
        else
        {
            maximumAmountOfTopStats = topStats.Count;
        }


        var topStatsListItems = new List<string>();

        topStatsListItems.Add("Your top points: " + getRealmPlayerTopStat());


        for (int i = 0; i < maximumAmountOfTopStats; i++)
        {
            if (topStats[i].Score > 1) // if there's not many players there may not be 5 top scores yet
            {
                topStatsListItems.Add($"{topStats[i].StatOwner.Name}: {topStats[i].Score} points");
            }
        };

        // Create a new label for each top score
        var label = new Label();
        label.AddToClassList("list-item-game-name-label");
        Func<VisualElement> makeItem = () => new Label();

        // Bind Stats to the UI
        Action<VisualElement, int> bindItem = (e, i) => {
            (e as Label).text = topStatsListItems[i];
            (e as Label).AddToClassList("list-item-game-name-label");
        };

        // Provide the list view with an explict height for every row
        // so it can calculate how many items to actually display
        const int itemHeight = 5;

        listView = new ListView(topStatsListItems, itemHeight, makeItem, bindItem);
        listView.AddToClassList("list-view");

    }
    public void setStatListener()
    {
        // :code-block-start: listen-for-stat-changes
        // :state-start: start
        // TODO: Create a listener that handles any changes to any Stat objects,
        // if there are changes, call `setNewlyInsertedScores()` to determine if
        // theres any new high scores and update the leaderboard in the UI
        // :state-end:
        // :state-start: sync local
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

                if(changes != null)
                {
                    setNewlyInsertedScores(changes.InsertedIndices);
                }
                // we only need to check for inserted because scores can't be modified or deleted after the run is complete
                
            });
        // :state-end:
        // :code-block-end:
    }

    public void setNewlyInsertedScores(int[] insertedIndices)
    {
        foreach (var i in insertedIndices)
        {
            var newStat = realm.All<Stat>().ElementAt(i);

            for (var scoreIndex = 0; scoreIndex < topStats.Count; scoreIndex++)
            {
                if (topStats.ElementAt(scoreIndex).Score < newStat.Score)
                {
                    if (topStats.Count > 4){   // An item shouldnt be removed if its the leaderboard is less than 5 items
                        topStats.RemoveAt(topStats.Count - 1);
                    }
                    topStats.Insert(scoreIndex, newStat);
                    root.Remove(listView); // remove the old listView
                    createTopStatListView(); // create a new listView
                    root.Add(listView); // add the new listView to the UI
                    break;
                }
            }
        }
    }
    void OnDisable()
    {
        // :code-block-start: leaderboard-cleanup-fn
        // :state-start: start
        // TODO: dispose of the realm instance and the listenerToken 
        // :state-end:
        // :state-start: sync local
        if (realm != null)
        {
            realm.Dispose();
        }

        if (listenerToken != null)
        {
            listenerToken.Dispose();
        }
        // :state-end:
        // :code-block-end:
    }
}