await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
<<<<<<< HEAD
    userEmail, myNewPassword,
    "<security-question-1-answer>",
    "<security-question-2-answer>");
=======
    userEmail, myNewPassword, new { token = "<token>", tokenId = "<token-=id>" });
>>>>>>> 657250e9f1732adbe0df302056d95d26fcf24312
