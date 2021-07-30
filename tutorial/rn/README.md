# Realm React Native Tutorial

Follow along at https://docs.mongodb.com/realm/tutorial/react-native/

## Troubleshooting

The most common issue is schema mismatch due to frequent little tweaks to the
schema as you develop your app.

- Be sure to **check the logs in Realm UI** for more information as well as the console in your app.
- **Delete the app from the simulator** to purge local data.
- **Restart Sync** in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to **deploy your changes** in the Realm UI.
- If your schema does not match the server, **compare the class definitions from the SDKs tab in the Realm UI** with those in the client code.
- When creating objects, make sure the **partition value of your new object matches** the partition value you opened the Realm with.

## Building & Running the sample app with Expo

- install [Expo](https://expo.io/) with `npm install -g expo-cli`

- Clone repo & cd into it

```bash
git clone https://github.com/mongodb/docs-realm/
cd docs-realm/tutorial/rn
```

- install all NPM packages and add `expo-dev-client` v0.0.4+

```bash
npm install
npm install expo-dev-client@0.4.4

```

- add Expo to the project

```bash
npm add expo
```

### Use Expo to run the App in iOS

`expo run:ios`

If asked to install Expo Go (running in a new Simulator / Emulator) you need to install Expo Go using:

```bash
expo start --dev-client 
```

### Use Expo to run the App in Android

`run:android`

If we do expo `run:android` and it fails, we need to:

`chmod a+x android/gradlew`

## Issues & Pull Requests

If you find an issue or have a suggestion, please let us know using the feedback
widget on the [docs site](http://docs.mongodb.com/realm/tutorial).

This repo is automatically derived from our main docs repo. If you'd like to
submit a pull request -- thanks! -- please feel free to do so at
https://github.com/mongodb/docs-realm/ (see the tutorial/ subdirectory).

