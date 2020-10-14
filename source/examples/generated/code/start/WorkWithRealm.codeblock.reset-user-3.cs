await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
    userEmail, myNewPassword, new { token = "<token>", tokenId = "<token-=id>" });