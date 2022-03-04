const navBar = {
  title: "MongoDB Realm Docs",
  logo: {
    alt: "Realm Logo",
    src: "/img/realm-logo.png",
  },
  items: [
    {
      label: "Get Started",
      href: "/get-started",
    },
    {
      type: "dropdown",
      label: "SDKs",
      position: "left",
      items: [
        {
          href: "/sdk/kotlin/intro",
          label: "Kotlin SDK",
        },
        {
          href: "/sdk/flutter/intro",
          label: "Flutter SDK",
        },
      ],
    },
    {
      type: "dropdown",
      label: "More",
      position: "left",
      items: [
        {
          href: "/studio",
          label: "Realm Studio",
        },
        {
          href: "https://docs.mongodb.com/realm-legacy/docs/",
          label: "Realm (Legacy)",
        },
        {
          href: "http://stitch-docs-old.s3-website-us-east-1.amazonaws.com/",
          label: "MongoDB Stitch (Legacy)",
        },
        {
          href: "https://docs.mongodb.com/realm/cloud/",
          label: "App Services"
        }
      ],
    },
  ],
};

module.exports = navBar;
