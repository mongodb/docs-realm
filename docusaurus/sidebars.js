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
          label: "Java SDK",
          href: "/sdk/java/intro",
          customProps: {
            description:
              "Build Android applications with Realm in Java or Kotlin.",
            svg_icon: "AndroidIcon",
          },
        },
        {
          type: "link",
          label: "Kotlin SDK (Beta)",
          href: "/sdk/kotlin/intro",
          customProps: {
            description:
              "Build Kotlin Multiplatform and Android applications with Realm.",
            svg_icon: "KotlinIcon",
          },
        },
        {
          type: "link",
          label: "Flutter SDK (Alpha)",
          href: "/sdk/flutter/intro",
          customProps: {
            description: "Build Flutter applications with Realm in Dart.",
            svg_icon: "FlutterIcon",
          },
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
  studio: [
    {
      type: "doc",
      label: "Get Started",
      id: "studio/index",
    },
  ],
};

module.exports = sidebars;
