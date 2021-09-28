using UnityEngine;
using Realms;
using System.Threading.Tasks;
using Realms.Sync;
using UnityEngine.SceneManagement;
using MongoDB.Bson;
using System.Linq;
using UnityEngine.UIElements;
using UnityEditor;
using UnityEngine.UI;

public class RealmController : MonoBehaviour
{
    private VisualTreeAsset leaderboardUXMLVisualTree;
    private VisualTreeAsset scoreCardUXMLVisualTree;
    private VisualTreeAsset authenticationUXMLVisualTree;

    private static Realm realm;
    private static int runTime; // total amount of time you've been playing during this playthrough/run (losing/winning resets runtime)
    private static int bonusPoints = 0; // start with 0 bonus points and at the end of the game we add bonus points based on how long you played

    private static Player currentPlayer; // the Player object for the current playthrough
    public static Stat currentStat; // the Stat object for the current playthrough

    private static App realmApp = App.Create(Constants.Realm.AppId); // (Part 2 Sync): realmApp represents the MongoDB Realm backend application
    public static User syncUser; // (Part 2 Sync): syncUser represents the realmApp's currently logged in user

    private void GenerateUIObjects(GameObject canvasGameObject, string uiObjectName)
    {
        var panelSettings = EditorGUIUtility.Load("Assets/Scripts/realm-tutorial-unity/UI ToolKit/UIPanelSettings.asset");

        // create an empty GameObject
        var gameObject = new GameObject();
        // create a UI object to add to the GameObject
        var uiDocument = gameObject.AddComponent<UIDocument>();
        // attach existing panel settings to the UI Document
        uiDocument.panelSettings = (PanelSettings)panelSettings;

        // Attach Manager Scripts to interact with UI Documents and attach the UI Document's VisualTreeAsset 
        switch (uiObjectName)
        {
            case "Authentication":
                gameObject.AddComponent<AuthenticationManager>();
                uiDocument.name = "Authentication";
                uiDocument.visualTreeAsset = authenticationUXMLVisualTree;
                break;
            case "Leaderboard":
                {
                    gameObject.AddComponent<LeaderboardManager>();
                    uiDocument.name = "Leaderboard";
                    uiDocument.visualTreeAsset = leaderboardUXMLVisualTree;
                }
                break;
            case "ScoreCard":
                gameObject.AddComponent<ScoreCardManager>();
                uiDocument.name = "ScoreCard";
                uiDocument.visualTreeAsset = scoreCardUXMLVisualTree;
                break;
        }

        // Attach the UI Document as a child of the Canvas
        uiDocument.transform.parent = canvasGameObject.transform;
    }

    private void Start()
    {
        // Load UXML Assets
        leaderboardUXMLVisualTree = EditorGUIUtility.Load("Assets/Scripts/realm-tutorial-unity/UI ToolKit/Leaderboard.uxml") as VisualTreeAsset;
        scoreCardUXMLVisualTree = EditorGUIUtility.Load("Assets/Scripts/realm-tutorial-unity/UI ToolKit/ScoreCard.uxml") as VisualTreeAsset;
        authenticationUXMLVisualTree = EditorGUIUtility.Load("Assets/Scripts/realm-tutorial-unity/UI ToolKit/Authentication.uxml") as VisualTreeAsset;

        // Create canvas as a container to hold UIDocuments
        var canvasGameObject = new GameObject();
        canvasGameObject.name = "Canvas";
        var canvas = canvasGameObject.AddComponent<Canvas>();

        // Configure canvas properties
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasGameObject.AddComponent<CanvasScaler>();
        canvasGameObject.AddComponent<GraphicRaycaster>();

        // Generate Authentication, Leaderboard, and Scorecard UI Objects
        GenerateUIObjects(canvasGameObject, "Authentication");
        GenerateUIObjects(canvasGameObject, "Leaderboard");
        GenerateUIObjects(canvasGameObject, "ScoreCard");
    }

    // :state-start: start local    
    // GetRealm() is a method that returns a realm instance
    private static Realm GetRealm()
    // :state-end:
    // :state-uncomment-start: sync
    // // GetRealm() is an asynchronous method that returns a synced realm
    // // GetRealm() takes a logged in Realms.Sync.User as a parameter
    // private static async Task<Realm> GetRealm(User loggedInUser)
    // :state-uncomment-end:
    {
        // :code-block-start: get-realm-fn
        // :state-start: start 
        // TODO: open a realm and return it
        // :state-uncomment-start: start
        // return null;
        // :state-uncomment-end:
        // :state-end: :state-start: local
        return Realm.GetInstance();
        // :state-end:
        // :state-uncomment-start: sync
        // var syncConfiguration = new SyncConfiguration("UnityTutorialPartition", loggedInUser);
        // return await Realm.GetInstanceAsync(syncConfiguration);
        // :state-uncomment-end:
        // :code-block-end:
    }

    // :code-block-start: realmcontroller-set-logged-in-user
    // :state-start: start local
    // setLoggedInUser() is a method that finds a Player object and creates a new Stat object for the current playthrough
    // setLoggedInUser() takes a userInput, representing a username, as a parameter
    public static void setLoggedInUser(string userInput)
    {
        realm = GetRealm();
        // :state-start: start
        // TODO: "Set the `currentPlayer` variable by querying the realm for the
        // player. If the player exists, give the player a new Stat object,
        // otherwise create a new player and give the new player a new Stat
        // object
        // :state-end:
        // :state-start: local
        var matchedPlayers = realm.All<Player>().Where(p => p.Name == userInput);

        if (matchedPlayers.Count() > 0) // if the player exists
        {
            currentPlayer = matchedPlayers.First();
            var stat = new Stat();
            stat.StatOwner = currentPlayer;

            realm.Write(() =>
            {
                currentStat = realm.Add(stat);
                currentPlayer.Stats.Add(currentStat);
            });
        }
        else
        {
            var player = new Player();
            player.Id = ObjectId.GenerateNewId().ToString();
            player.Name = userInput;

            var stat = new Stat();
            stat.StatOwner = player;

            realm.Write(() =>
            {
                currentPlayer = realm.Add(player);
                currentStat = realm.Add(stat);
                currentPlayer.Stats.Add(currentStat);
            });
        }
        // :state-end:
        startGame();
    }
    // :state-end:
    // :code-block-end:

    // :code-block-start: realmcontroller-set-logged-in-user-synced
    // :state-uncomment-start: sync
    // // setLoggedInUser() is an asynchronous method that logs in as a Realms.Sync.User, creates a new Stat object for the current playthrough
    // // and returns the Player object that corresponds to the logged in Realms.Sync.User
    // // setLoggedInUser() takes a userInput and passInput, representing a username/password, as a parameter
    // public static async Task<Player> setLoggedInUser(string userInput, string passInput)
    // {
    //     syncUser = await realmApp.LogInAsync(Credentials.EmailPassword(userInput, passInput));
    //     if (syncUser != null)
    //     {
    //         realm = await GetRealm(syncUser);
    //         currentPlayer = realm.Find<Player>(syncUser.Id);
    //         if (currentPlayer != null)
    //         {
    //             var stat = new Stat();
    //             stat.StatOwner = currentPlayer;
    //             realm.Write(() =>
    //             {
    //                 currentStat = realm.Add(stat);
    //                 currentPlayer.Stats.Add(currentStat);
    //             });
    //             startGame();
    //         }
    //         else
    //         {
    //             Debug.Log("This player exists a MongoDB Realm User but not as a Realm Object, please delete the MongoDB Realm User and create one using the Game rather than MongoDB Atlas or Realm Studio");
    //         }
    //     }
    //     return currentPlayer;
    // }
    // :state-uncomment-end:
    // :code-block-end:

    // :code-block-start: realmcontroller-press-register-sync
    // :state-uncomment-start: sync
    // // OnPressRegister() is an asynchronous method that registers as a Realms.Sync.User, creates a new Player and Stat object 
    // // OnPressRegister takes a userInput and passInput, representing a username/password, as a parameter
    // public static async Task<Player> OnPressRegister(string userInput, string passInput)
    // {
    //     await realmApp.EmailPasswordAuth.RegisterUserAsync(userInput, passInput);
    //     syncUser = await realmApp.LogInAsync(Credentials.EmailPassword(userInput, passInput));
    //     realm = await GetRealm(syncUser);

    //     var player = new Player();
    //     player.Id = syncUser.Id;
    //     player.Name = userInput;
    //     var stat = new Stat();
    //     stat.StatOwner = player;
    //     realm.Write(() =>
    //     {
    //         currentPlayer = realm.Add(player);
    //         currentStat = realm.Add(stat);
    //         currentPlayer.Stats.Add(currentStat);
    //     });
    //     startGame();
    //     return currentPlayer;
    // }
    // :state-uncomment-end:
    // :code-block-end:


    // LogOut() is an asynchronous method that logs out and reloads the scene
    public static async void LogOut()
    {
        // :state-uncomment-start: sync
        // await syncUser.LogOutAsync();
        // :state-uncomment-end:
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }


    // startGame() is a method that records how long the player has been playing during the current playthrough (i.e since logging in or since last losing or winning)
    private static void startGame()
    {
        // execute a timer every 10 second
        var myTimer = new System.Timers.Timer(10000);
        myTimer.Enabled = true;
        myTimer.Elapsed += (sender, e) => runTime += 10; // increment runTime (runTime will be used to calculate bonus points once the player wins the game)
    }

    // collectToken() is a method that performs a write transaction to update the current playthrough Stat object's TokensCollected count
    public static void collectToken()
    {
        // :code-block-start: collect-token-fn
        // :state-start: start
        // TODO: within a write transaction, increment the number of token's collected in the current playthrough/run's stat
        // :state-end:
        // :state-start: sync local
        realm.Write(() =>
        {
            currentStat.TokensCollected += 1;
        });
        // :state-end:
        // :code-block-end:
    }
    // defeatEnemy() is a method that performs a write transaction to update the current playthrough Stat object's enemiesDefeated count
    public static void defeatEnemy()
    {
        // :code-block-start: defeat-enemy-fn
        // :state-start: start
        // TODO: within a write transaction, increment the number of enemies's defeated in the current playthrough/run's stat
        // :state-end:
        // :state-start: sync local
        realm.Write(() =>
        {
            currentStat.EnemiesDefeated += 1;
        });
        // :state-end:
        // :code-block-end:
    }

    // deleteCurrentStat() is a method that performs a write transaction to delete the current playthrough Stat object and remove it from the current Player object's Stats' list
    public static void deleteCurrentStat()
    {
        // :code-block-start: delete-current-stat-method
        ScoreCardManager.UnRegisterListener();
        // :state-start: start
        // TODO: within a write transaction, delete the current Stat object, and its reference in the current Player object
        // :state-end:
        // :state-start: local sync
        realm.Write(() =>
        {
            realm.Remove(currentStat);
            currentPlayer.Stats.Remove(currentStat);
        });
        // :state-end:
        // :code-block-end:
    }
    // restartGame() is a method that creates a new plathrough Stat object and shares this new Stat object with the ScoreCardManager to update in the UI and listen for changes to it
    public static void restartGame()
    {
        var stat = new Stat();
        stat.StatOwner = currentPlayer;
        realm.Write(() =>
        {
            currentStat = realm.Add(stat);
            currentPlayer.Stats.Add(currentStat);
        });

        ScoreCardManager.SetCurrentStat(currentStat); // call `SetCurrentStat()` to set the current stat in the UI using ScoreCardManager
        ScoreCardManager.WatchForChangesToCurrentStats(); // call `WatchForChangesToCurrentStats()` to register a listener on the new score in the ScoreCardManager

        startGame(); // start the game by resetting the timer and officially starting a new run/playthrough
    }


    // playerWon() is a method that calculates and returns the final score for the current playthrough once the player has won the game
    public static int playerWon()
    {
        if (runTime <= 30) // if the game is beat in in less than or equal to 30 seconds, +80 bonus points
        {
            bonusPoints = 80;
        }
        else if (runTime <= 60) // if the game is beat in in less than or equal to 1 min, +70 bonus points
        {
            bonusPoints = 70;
        }
        else if (runTime <= 90) // if the game is beat in less than or equal to 1 min 30 seconds, +60 bonus points
        {
            bonusPoints = 60;
        }
        else if (runTime <= 120) // if the game is beat in less than or equal to 2 mins, +50 bonus points
        {
            bonusPoints = 50;
        }

        var finalScore = (currentStat.EnemiesDefeated + 1) * (currentStat.TokensCollected + 1) + bonusPoints;
        realm.Write(() =>
        {
            currentStat.Score = finalScore;
        });

        return finalScore;
    }
}