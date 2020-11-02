async function linkAccounts(user,email,password){
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
      );
    return user.linkCredentials(emailPasswordUserCredentials);
}

async function run(){
    const linkedAccount = await linkAccounts(anonUser,email, password)
      .catch((err) => console.log(`An error occurred while linking accounts: ${JSON.stringify(err, 2, null)}`));
}
run();