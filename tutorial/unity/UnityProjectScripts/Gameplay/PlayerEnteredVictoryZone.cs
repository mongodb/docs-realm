
using Platformer.Core;
using Platformer.Mechanics;
using Platformer.Model;
using UnityEditor;

namespace Platformer.Gameplay
{

    /// <summary>
    /// This event is triggered when the player character enters a trigger with a VictoryZone component.
    /// </summary>
    /// <typeparam name="PlayerEnteredVictoryZone"></typeparam>
    public class PlayerEnteredVictoryZone : Simulation.Event<PlayerEnteredVictoryZone>
    {
        public VictoryZone victoryZone;

        PlatformerModel model = Simulation.GetModel<PlatformerModel>();

        // :code-block-start: player-victory-and-call-restart-game
        public override void Execute()
        {
            var scoreAndBonusPoints = RealmController.playerWon();

            var didClickRestart = EditorUtility.DisplayDialog("You won!", $"Final Score = {scoreAndBonusPoints[0]} (including {scoreAndBonusPoints[1]} bonus points)", "restart game", "cancel");
            if (didClickRestart == true)
            {
                Simulation.Schedule<PlayerSpawn>(2);
                RealmController.restartGame();
            }
        }
        // :code-block-end:
    }
}