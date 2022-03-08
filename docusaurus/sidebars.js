/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  landing: [
    {
      type: "category",
      label: "Realm SDK Documentation",
      collapsible: false,
      link: {
        type: "doc",
        id: "index",
      },
      items: [
        {
          type: "link",
          label: "Flutter", // The link label
          href: "/sdk/flutter/intro", // The internal path
        },
        {
          type: "link",
          label: "Kotlin", // The link label
          href: "/sdk/kotlin/intro", // The internal path
        },
      ],
    },
  ],
  getStarted: [
    {
      type: "category",
      label: "Get Started",
      collapsible: false,
      link: {
        type: "doc",
        id: "get-started",
      },
      items: [
        "get-started/introduction-backend",
        "get-started/introduction-mobile",
        "get-started/introduction-web",
      ],
    },
  ],
  kotlin: [
    "intro",
    {
      type: "category",
      label: "Install",
      collapsible: true,
      collapsed: false,
      items: ["install/android", "install/kotlin-multiplatform"],
    },
    "quick-start",
    {
      type: "category",
      label: "Realm Database",
      collapsible: true,
      collapsed: false,
      items: [
        "realm-database/overview",
        "realm-database/open-and-close-a-realm",
        {
          type: "category",
          label: "Create",
          collapsible: true,
          collapsed: true,
          items: ["realm-database/create/create-a-new-object"],
        },
        {
          type: "category",
          label: "Read",
          collapsible: true,
          collapsed: true,
          items: [
            "realm-database/read/find-object-by-primary-key",
            "realm-database/read/find-objects-of-a-type",
            "realm-database/read/sort-queries",
            "realm-database/read/iteration",
          ],
        },
        {
          type: "category",
          label: "Update",
          collapsible: true,
          collapsed: true,
          items: [
            "realm-database/update/modify-an-object",
            "realm-database/update/upsert-an-object",
          ],
        },
        {
          type: "category",
          label: "Delete",
          collapsible: true,
          collapsed: true,
          items: [
            "realm-database/delete/delete-an-object",
            "realm-database/delete/delete-multiple-objects",
            "realm-database/delete/delete-all-objects-of-a-type",
          ],
        },
        "realm-database/query-language",
        "realm-database/write-transactions",
        "realm-database/frozen-architecture",
        {
          type: "category",
          label: "Schemas",
          collapsible: true,
          collapsed: true,
          items: ["realm-database/schemas/supported-types"],
        },
      ],
    },
    {
      type: "category",
      label: "Sync",
      collapsible: true,
      collapsed: true,
      items: ["sync/overview", "sync/open-a-synced-realm"],
    },
    {
      type: "category",
      label: "App Services",
      collapsible: true,
      collapsed: true,
      items: [
        "app-services/overview",
        "app-services/connect",
        "app-services/register-users",
        "app-services/authenticate-users",
      ],
    },
    "migrate-from-java-sdk",
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/realm/realm-kotlin/blob/releases/CHANGELOG.md",
    },
    {
      type: "link",
      label: "API Reference",
      href: "https://docs.mongodb.com/realm-sdks/kotlin/latest/",
    },
  ],
  studio: [
    {
      type: "doc",
      label: "Get Started",
      id: "studio/index",
    },
  ],
};

module.exports = sidebars;
