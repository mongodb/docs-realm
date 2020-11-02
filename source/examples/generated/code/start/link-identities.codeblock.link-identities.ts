async function linkAccounts(user: Realm.User,email: string,password: string){
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
      );
    return user.linkCredentials(emailPasswordUserCredentials);
}

async function run(){
    const linkedAccount = await linkAccounts(anonUser,email, password)
      .catch((err) => console.log(`An error occurred while linking accounts: ${err}`));
}
run();