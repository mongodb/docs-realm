// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

const url = process.env.DOCUSAURUS_URL || "https://realm.io";
const baseUrl = process.env.DOCUSAURUS_BASE_URL || "docs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Realm Docs",
  tagline:
    "Realm is a mobile database designed for modern, data-driven applications. You can use Realm to build mobile, web, desktop, and IoT apps.",
  url,
  baseUrl: `/${baseUrl}/`,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: true, // true for hosting on s3; set to false for github pages. See https://docusaurus.io/docs/api/docusaurus-config#trailing-slash
  favicon: "img/realm-logo.png",
  organizationName: "mongodb",
  projectName: "docs-realm",
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // id: "main",
          routeBasePath: "/",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "flutter",
        lastVersion: "current",
        includeCurrentVersion: true,
        versions: {
          current: {
            label: "0.2.0+alpha",
          },
        },
        path: "sdk-sites/flutter/docs",
        routeBasePath: "sdk/flutter/",
        sidebarPath: require.resolve("./sdk-sites/flutter/sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "kotlin",
        lastVersion: "current",
        includeCurrentVersion: true,
        versions: {
          current: {
            label: "0.10.0",
          },
        },
        path: "sdk-sites/kotlin/docs",
        routeBasePath: "sdk/kotlin/",
        sidebarPath: require.resolve("./sdk-sites/kotlin/sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "java",
        lastVersion: "current",
        includeCurrentVersion: true,
        versions: {
          current: {
            label: "10.10.1",
          },
        },
        path: "sdk-sites/java/docs",
        routeBasePath: "sdk/java/",
        sidebarPath: require.resolve("./sdk-sites/java/sidebars.js"),
      },
    ],
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // whether to index docs pages
        indexDocs: true,

        // Whether to also index the titles of the parent categories in the sidebar of a doc page.
        // 0 disables this feature.
        // 1 indexes the direct parent category in the sidebar of a doc page
        // 2 indexes up to two nested parent categories of a doc page
        // 3...
        //
        // Do _not_ use Infinity, the value must be a JSON-serializable integer.
        indexDocSidebarParentCategories: 0,

        // whether to index blog pages
        indexBlog: false,

        // whether to index static pages
        // /404.html is never indexed
        indexPages: false,

        // language of your documentation, see next section
        language: "en",

        // setting this to "none" will prevent the default CSS to be included. The default CSS
        // comes from autocomplete-theme-classic, which you can read more about here:
        // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-theme-classic/
        style: undefined,

        // lunr.js-specific settings
        lunr: {
          // When indexing your documents, their content is split into "tokens".
          // Text entered into the search box is also tokenized.
          // This setting configures the separator used to determine where to split the text into tokens.
          // By default, it splits the text at whitespace and dashes.
          //
          // Note: Does not work for "ja" and "th" languages, since these use a different tokenizer.
          tokenizerSeparator: /[\s\-]+/,
          // https://lunrjs.com/guides/customising.html#similarity-tuning
          //
          // This parameter controls the importance given to the length of a document and its fields. This
          // value must be between 0 and 1, and by default it has a value of 0.75. Reducing this value
          // reduces the effect of different length documents on a term’s importance to that document.
          b: 0.75,
          // This controls how quickly the boost given by a common word reaches saturation. Increasing it
          // will slow down the rate of saturation and lower values result in quicker saturation. The
          // default value is 1.2. If the collection of documents being indexed have high occurrences
          // of words that are not covered by a stop word filter, these words can quickly dominate any
          // similarity calculation. In these cases, this value can be reduced to get more balanced results.
          k1: 1.2,
          // By default, we rank pages where the search term appears in the title higher than pages where
          // the search term appears in just the text. This is done by "boosting" title matches with a
          // higher value than content matches. The concrete boosting behavior can be controlled by changing
          // the following settings.
          titleBoost: 5,
          contentBoost: 1,
          parentCategoriesBoost: 2, // Only used when indexDocSidebarParentCategories > 0
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: require("./navigation.js"),
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Realm App Services Documentation",
                to: "https://www.mongodb.com/docs/realm/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/realm",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/realm",
              },
              {
                label: "MongoDB Developer Hub",
                href: "https://www.mongodb.com/developer/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/mongodb/docusaurus-realm",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MongoDB, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // careful -- adding a nonexistent language will break
        // the build without any error output!
        additionalLanguages: [
          "kotlin",
          "java",
          "dart",
          "groovy",
          "csharp",
          "swift",
        ],
      },
    }),
};

module.exports = config;
