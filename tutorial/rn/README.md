# To Run:

1. Use Node <= 10 (if you want to switch to node 10 and have "nvm" installed, you can run `nvm use 10`)
2. `cd` into rn/
3. `npm install`
4. `cd ios` && `pod install --repo-update` && `cd ..`
5. replace `appId` in "getRealmApp.js" with your Realm app ID, which you can find in the Realm UI
6. Run `npx react-native run-ios` or `npx react-native run-android`
