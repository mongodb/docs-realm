logoutButton.clicked += RealmController.LogOutBackend;
passInput = root.Q<TextField>("password-input");
passInput.isPasswordField = true;
//  when the start button is clicked, toggle between registration modes
startButton.clicked += () =>
{
    if (isInRegistrationMode == true)
    {
        OnPressRegister();
    }
    else
    {
        OnPressLoginWithBackend();
    }
};
toggleLoginOrRegisterUIButton = root.Q<Button>("toggle-login-or-register-ui-button");
toggleLoginOrRegisterUIButton.clicked += () =>
{
    // if in registration mode, swap to the login mode
    if (isInRegistrationMode == true)
    {
        SwitchToLoginUI();
        isInRegistrationMode = false;
    }
    else
    {
        SwitchToRegisterUI();
        isInRegistrationMode = true;
    }
};
