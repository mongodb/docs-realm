# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment to Github Pages

Prerequisites:

1. Set up your site to use GitHub pages:

   1. In your repo, go to "Settings" (tab bar) > "Pages" (sidebar)

   1. Activate GitHub Pages, with "gh-pages" as the source branch and "/" as the source directory.

   1. After you push your site, you should be able to view it (after 30 seconds to a minute of backend magic) at the link on the GitHub Pages configuration page.

1. Use the following command to build your site and push it to the gh-pages branch (this will create the branch if it doesn't exist already)

   Using SSH for github auth:

   ```
   $ USE_SSH=true yarn deploy
   ```

   Not using SSH for github auth:

   ```
   $ GIT_USER=<Your GitHub username> yarn deploy
   ```
