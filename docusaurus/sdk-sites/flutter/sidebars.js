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
  flutter: [
    {
      type: "doc",
      label: "Flutter SDK (Alpha)",
      id: "intro",
    },
    {
      type: "doc",
      label: "Install Realm",
      id: "install",
    },
    {
      type: "doc",
      label: "Quick Start",
      id: "quick-start",
    },
    {
      type: "doc",
      label: "Realm Database",
      id: "realm-database",
    },
    {
      Versions: [
        {
          type: "link",
          label: "Preview",
          href: "/sdk/flutter/preview/intro",
        },
      ],
    },
  ],
};

module.exports = sidebars;
