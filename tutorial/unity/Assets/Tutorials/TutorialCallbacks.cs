using UnityEngine;
using Unity.InteractiveTutorials;
using UnityEditor;

namespace Unity.Tutorials
{
    /// <summary>
    /// Implement your Tutorial callbacks here.
    /// </summary>
    public class TutorialCallbacks : ScriptableObject
    {
        public GameObject TokenToSelect;

        /// <summary>
        /// Selects a GameObject in the scene, marking it as the active object for selection
        /// </summary>
        /// <param name="futureObjectReference"></param>
        public void SelectSpawnedGameObject(FutureObjectReference futureObjectReference)
        {
            if (futureObjectReference.sceneObjectReference == null) { return; }
            SelectGameObject(futureObjectReference.sceneObjectReference.ReferencedObjectAsGameObject);
        }

        public void SelectGameObject(GameObject gameObject)
        {
            if (!gameObject) { return; }
            Selection.activeObject = gameObject;
        }

        public void SelectToken()
        {
            if (!TokenToSelect)
            {
                TokenToSelect = GameObject.FindGameObjectWithTag("TutorialRequirement");
                if (!TokenToSelect)
                {
                    Debug.LogErrorFormat("A TokenInstance with the tag '{0}' must be in the scene in order to make this tutorial work properly. Please add the tag {0} to one of your tokens in the scene", "TutorialRequirement");
                    return;
                }
            }
            SelectGameObject(TokenToSelect);
        }

        public void SelectMoveTool()
        {
            Tools.current = Tool.Move;
        }

        public void SelectRotateTool()
        {
            Tools.current = Tool.Rotate;
        }
    }
}