// SwitchToLoginUI() switches the UI to the Login UI mode
private static void SwitchToLoginUI()
{
    subtitle.text = "Login";
    startButton.text = "Login & Start Game";
    toggleLoginOrRegisterUIButton.text = "Don't have an account yet? Register";
}
// SwitchToRegisterUI() switches the UI to the Register UI mode
private static void SwitchToRegisterUI()
{
    subtitle.text = "Register";
    startButton.text = "Signup & Start Game";
    toggleLoginOrRegisterUIButton.text = "Have an account already? Login";
}
