# MongoDB Realm - Web Tutorial

This is a companion task tracker application for the MongoDB Realm [web
tutorial](https://docs.mongodb.com/realm/tutorial/web-graphql).

The app is built with [TypeScript](https://www.typescriptlang.org/) and uses
[Apollo Client](https://www.apollographql.com/docs/react/) to demonstrate how to
connect a [React](https://reactjs.org/) application to MongoDB Realm's GraphQL
API. It also uses [GraphQL Code Generator](https://graphql-code-generator.com)
to automatically create TypeScript types based on the GraphQL schema.

A working implementation, including generated code and fully-implemented source
files, is available on the `master` branch. All you have to do is add your Realm
App ID in `/src/RealmApp.tsx`:

```tsx
const REALM_APP_ID = "task-tracker-tutorial-abcde";
```

To follow along with the tutorial, including configuring code generation and
implementing Realm-specific source code, use the `todo` branch:

```shell
git checkout todo
```

> ⚛ This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Run the App

Make sure you've installed all of the app's dependencies:

```shell
npm install
```

To run the app, make sure you've added your App ID then run the following in
your shell:

```shell
npm run start
```
