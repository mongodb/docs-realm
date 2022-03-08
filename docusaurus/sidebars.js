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
      type: 'category',
      label: 'Realm SDK Documentation',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'index'
      },
      items: [
        'sdk/kotlin/intro',
        'sdk/flutter/intro',
        'sdk/java/intro',
      ]
    }
  ],
  getStarted: [
    {
      type: 'category',
      label: 'Get Started',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'get-started'
      },
      items: [
        'get-started/introduction-backend',
        'get-started/introduction-mobile',
        'get-started/introduction-web',
      ]
    }
  ],
  flutter: [{ type: 'autogenerated', dirName: 'sdk/flutter' }],
  kotlin: [
    'sdk/kotlin/intro',
    {
      type: 'category',
      label: 'Install',
      collapsible: true,
      collapsed: false,
      items: ['sdk/kotlin/install/android', 'sdk/kotlin/install/kotlin-multiplatform'],
    },
    'sdk/kotlin/quick-start',
    {
      type: 'category',
      label: 'Realm Database',
      collapsible: true,
      collapsed: false,
      items: [
        'sdk/kotlin/realm-database/overview',
        'sdk/kotlin/realm-database/open-and-close-a-realm',
        {
          type: 'category',
          label: 'Create',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/realm-database/create/create-a-new-object',
          ],
        },
        {
          type: 'category',
          label: 'Read',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/realm-database/read/find-object-by-primary-key',
            'sdk/kotlin/realm-database/read/find-objects-of-a-type',
            'sdk/kotlin/realm-database/read/sort-queries',
            'sdk/kotlin/realm-database/read/iteration',
          ],
        },
        {
          type: 'category',
          label: 'Update',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/realm-database/update/modify-an-object',
            'sdk/kotlin/realm-database/update/upsert-an-object',
          ],
        },
        {
          type: 'category',
          label: 'Delete',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/realm-database/delete/delete-an-object',
            'sdk/kotlin/realm-database/delete/delete-multiple-objects',
            'sdk/kotlin/realm-database/delete/delete-all-objects-of-a-type',
          ],
        },
        'sdk/kotlin/realm-database/query-language',
        'sdk/kotlin/realm-database/write-transactions',
        'sdk/kotlin/realm-database/frozen-architecture',
        {
          type: 'category',
          label: 'Schemas',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/realm-database/schemas/supported-types',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'App Services',
      collapsible: true,
      collapsed: true,
      items: [
        'sdk/kotlin/app-services/overview',
        'sdk/kotlin/app-services/connect',
        'sdk/kotlin/app-services/register-users',
        'sdk/kotlin/app-services/authenticate-users',
        {
          type: 'category',
          label: 'Sync',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/kotlin/app-services/sync/overview',
            'sdk/kotlin/app-services/sync/open-a-synced-realm'
          ],
        },
      ],
    },
    'sdk/kotlin/migrate-from-java-sdk',
    {
      type: 'link',
      label: 'Release Notes',
      href: 'https://github.com/realm/realm-kotlin/blob/releases/CHANGELOG.md',
    },
    {
      type: 'link',
      label: 'API Reference',
      href: 'https://docs.mongodb.com/realm-sdks/kotlin/latest/',
    },
  ],
  java: [
    'sdk/java/intro',
    'sdk/java/install',
    'sdk/java/quick-start',
    `sdk/java/async-api`,
    {
      type: 'category',
      label: 'Realm Database',
      collapsible: true,
      collapsed: false,
      items: [
        'sdk/java/realm-database/overview',
        'sdk/java/realm-database/open-and-close-a-realm',
        {
          type: 'category',
          label: 'Create',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/create/create-a-new-object',
          ],
        },
        {
          type: 'category',
          label: 'Read',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/read/find-object-by-primary-key',
            'sdk/java/realm-database/read/find-objects-of-a-type',
            'sdk/java/realm-database/read/sort-queries',
            'sdk/java/realm-database/read/iteration',
          ],
        },
        {
          type: 'category',
          label: 'Update',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/update/modify-an-object',
            'sdk/java/realm-database/update/upsert-an-object',
          ],
        },
        {
          type: 'category',
          label: 'Delete',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/delete/delete-an-object',
            'sdk/java/realm-database/delete/delete-multiple-objects',
            'sdk/java/realm-database/delete/delete-all-objects-of-a-type',
          ],
        },
        'sdk/java/realm-database/query-language',
        'sdk/java/realm-database/write-transactions',
        {
          type: 'category',
          label: 'Schemas',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/schemas/supported-types',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'App Services',
      collapsible: true,
      collapsed: true,
      items: [
        'sdk/java/app-services/overview',
        'sdk/java/app-services/connect',
        'sdk/java/app-services/register-users',
        'sdk/java/app-services/authenticate-users',
        {
          type: 'category',
          label: 'Sync',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/app-services/sync/overview',
            'sdk/java/app-services/sync/open-a-synced-realm'
          ],
        },
      ],
    },
    'sdk/java/troubleshooting',
    {
      type: 'link',
      label: 'Release Notes',
      href: 'https://github.com/realm/realm-java/blob/releases/CHANGELOG.md',
    },
    {
      type: 'link',
      label: 'API Reference',
      href: 'https://docs.mongodb.com/realm/sdk/java/api/',
    },
  ],

  studio: [
    {
      type: 'doc',
      label: 'Get Started',
      id: 'studio/index',
    },
  ]
};

module.exports = sidebars;
