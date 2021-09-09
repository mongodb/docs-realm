using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Realms;
using UnityEngine;
using UnityEngine.UIElements;
using System.ComponentModel;

public class ScoreCardManager : MonoBehaviour
{
    private static Realm realm;
    public static VisualElement root;
    public static Label scoreCardHeader;
    public static string username;
    public static Player currentPlayer;
    public static Stat currentStat;
    public static PropertyChangedEventHandler propertyHandler = new PropertyChangedEventHandler((sender, e) => updateCurrentStats());

    void Start()
    {
        root = GetComponent<UIDocument>().rootVisualElement;
        scoreCardHeader = root.Q<Label>("score-card-header");
    }

    public static void setLoggedInUser(string loggedInUser)
    {
        username = loggedInUser;
        currentStat = RealmController.currentStat;
        updateCurrentStats(); // set initial stats
        watchForChangesToCurrentStats();
    }

    public static void updateCurrentStats() // updates stats in UI
    {
        scoreCardHeader.text = username + "\n" +
        "Enemies Defeated: " + currentStat.EnemiesDefeated + "\n" +
        "Tokens Collected: " + currentStat.TokensCollected + "\n" +
        "Current Score: " + currentStat.Score;
    }


    public static void watchForChangesToCurrentStats()
    {
        // create a listener that responds to changes to the particular stats for this run/playthrough
        // :code-block-start: watch-for-changes-stat-propery-changed
        // :state-start: start
        // TODO: Create a listener that reacts to changes to the currentStat and calls updateCurrentStats() to update the UI when stats are changed
        // :state-end:
        // :state-start: sync local
        currentStat.PropertyChanged += propertyHandler;
        // :state-end:
        // :code-block-end:
    }

    public static void unRegisterListener()
    {
        // unregister when the player has lost
        currentStat.PropertyChanged -= propertyHandler;
        scoreCardHeader.text = username + "\n" +
        "Enemies Defeated: " + 0 + "\n" +
        "Tokens Collected: " + 0 + "\n" +
        "Current Score: " + 0;

    }

    public static void setCurrentStat(Stat newStat)
    {
        // called when the game has reset
        currentStat = newStat;
        updateCurrentStats();
    }
}