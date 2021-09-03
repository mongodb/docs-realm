## To Run this Repository:

- Generate the "Platformer Microgame" from Unity Hub > Learn (to learn more about this: https://learn.unity.com/project/2d-platformer-template)
- Install Realm
- git clone <artifact-repo-url>
- cd <artifact-repo-title>
- cp -rf RealmScripts <LocationOfYourMicroGame>/Assets/Scripts
- attach the scripts to the relevant GameObjects
- Follow the tutorial to fill out your functions
- Click play





To create scoreboard:
    - create UI canvas
    - create empty > rename GameObject > RealmController > attach script to it
    <!-- - create empty > rename GameObject > ScoreCardManager > attach script to it -->
    - create Text inside (verticle overflow > overflow; font size > 48; drag text to top left) > Rename "ScoreCard" > set width 600 + height 30
    - Create UIDocument inside - named leaderboard; inside UI Toolkit in the bottom create leaderboard UIDocument; Add UIDocument Leaderboard to source document of UIDocument GameObject Leaderboard ; attach leaderboard manager to it ; add new stylesheet > uss file



To add sync:


    - create backend app
    - enable email/pass auth
    - development mode, string _partition, db unity-tutorial