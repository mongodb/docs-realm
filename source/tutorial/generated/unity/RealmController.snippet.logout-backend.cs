// LogOutBackend() is an asynchronous method that logs out 
// the current MongoDB Realm User
public static async void LogOutBackend()
{
    await syncUser.LogOutAsync();
    SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}
