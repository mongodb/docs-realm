# Realm Unity Tutorial

Follow along at https://docs.mongodb.com/realm/tutorial/unity/

## Run the Unity SDK Tutorial Code

This codebase is not a complete client and requires importing the files into the [Unity Learn Platformer Microgame](https://learn.unity.com/project/2d-platformer-template) client in order to run the project. To import this codebase into the Platformer Microgame client and run the project:

- From Unity Hub > Click Download Project > Open Project to automatically open it in Unity.
- Follow the steps in the [Unity SDK Integration Guide](https://docs.mongodb.com/realm/sdk/dotnet/unity/#install) to install Realm.
- Through the Unity Package Manager, install [com.unity.ui.builder](https://docs.unity3d.com/Packages/com.unity.ui.builder@1.0/manual/index.html) and [com.unity.ui.builder](https://docs.unity3d.com/Packages/com.unity.ui@1.0/manual/index.html).
- Drag and drop the RealmScripts from this codebase into your project's scripts folder to import your files.
- In your project's [hierarchy window](https://docs.unity3d.com/Manual/Hierarchy.html), right click and create an empty GameObject named "RealmController".
- Click your RealmController GameObject and drag and drop RealmScripts/RealmController.cs file into your GameObject to [attach the C# file as a game script](https://docs.unity3d.com/Manual/UnityAnalyticsAttachSDK.html).
- In your project's [hierarchy window](https://docs.unity3d.com/Manual/Hierarchy.html), right click and create a UI Canvas named "Canvas".
- As children of your Canvas GameObject, create three UIDocument GameObjects named "ScoreCard", "Leaderboard", and "AuthenticationScreen".
- Attach the scripts "ScoreCardManager.cs", "LeaderboardManager.cs", and "AuthenticationManager.cs" to each UIDocument GameObject respectively.
- Replace the following files with the matching files in this codebase: Scripts/Gameplay/PlayerDeath.cs, Scripts/Gameplay/PlayerEnemyCollision, Scripts/Gameplay/PlayerEnteredVictoryZone.cs, Scripts/Gameplay/PlayerEnteredVictoryZone.cs, Scripts/Mechanics/TokenInstance.cs.
- Click the "Play" button on the top of your screen to enter [Play Mode](https://docs.unity3d.com/Manual/GameView.html) and test your project.

## Troubleshooting

The most common issue is schema mismatch due to frequent little tweaks to the
schema as you develop your app.

- Be sure to **check the logs in Realm UI** for more information as well as the console in your app.
- **Delete the app from the simulator** to purge local data.
- **Restart Sync** in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to **deploy your changes** in the Realm UI.
- If your schema does not match the server, **compare the class definitions from the SDKs tab in the Realm UI** with those in the client code.
- When creating objects, make sure the **partition value of your new object matches** the partition value you opened the Realm with.

## Issues & Pull Requests

If you find an issue or have a suggestion, please let us know using the feedback
widget on the [docs site](http://docs.mongodb.com/realm/tutorial).

This repo is automatically derived from our main docs repo. If you'd like to
submit a pull request -- thanks! -- please feel free to do so at
https://github.com/mongodb/docs-realm/ (see the tutorial/ subdirectory).
