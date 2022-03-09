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
        id: 'index',
      },
      items: [
        'sdk/java/intro',
        'sdk/kotlin/intro',
      ],
    },
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
      ],
    },
  ],
  kotlin: [
    'sdk/kotlin/intro',
    {
      type: 'category',
      label: 'Install',
      collapsible: true,
      collapsed: false,
      items: [
        'sdk/kotlin/install/android',
        'sdk/kotlin/install/kotlin-multiplatform',
      ],
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
            'sdk/kotlin/app-services/sync/open-a-synced-realm',
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
    'sdk/java/android-livedata',
    {
      type: 'category',
      label: 'Realm Database',
      collapsible: true,
      collapsed: false,
      items: [
        'sdk/java/realm-database/overview',
        'sdk/java/realm-database/query-language',
        'sdk/java/realm-database/write-transactions',
        'sdk/java/realm-database/filter-data',
        'sdk/java/realm-database/notifications',
        {
          type: 'category',
          label: 'Realms',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/realms/overview',
            'sdk/java/realm-database/realms/open-and-close-a-realm',
            'sdk/java/realm-database/realms/bundle-a-realm',
            'sdk/java/realm-database/realms/encrypt-a-realm',
          ],
        },
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
            'sdk/java/realm-database/update/update-a-collection',
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
            'sdk/java/realm-database/delete/delete-all',
          ],
        },
        {
          type: 'category',
          label: 'Schemas',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/realm-database/schemas/overview',
            {
              type: 'category',
              label: 'Data Types',
              collapsible: true,
              collapsed: true,
              items: [
                'sdk/java/realm-database/schemas/data-types/supported-types',
                'sdk/java/realm-database/schemas/data-types/collections',
                'sdk/java/realm-database/schemas/data-types/counters',
                'sdk/java/realm-database/schemas/data-types/enums',
                'sdk/java/realm-database/schemas/data-types/embedded-objects',
                'sdk/java/realm-database/schemas/data-types/realm-any',
                'sdk/java/realm-database/schemas/data-types/realm-dictionary',
                'sdk/java/realm-database/schemas/data-types/realm-set',
              ],
            },
            'sdk/java/realm-database/schemas/relationships',
            'sdk/java/realm-database/schemas/versions-and-migrations',
          ],
        },
        'sdk/java/realm-database/freeze-objects',
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
        {
          type: 'category',
          label: 'Users',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/app-services/users/authenticate-users',
            'sdk/java/app-services/users/user-api-keys',
            'sdk/java/app-services/users/email-password-users',
            'sdk/java/app-services/users/custom-user-data',
            'sdk/java/app-services/users/link-users',
            'sdk/java/app-services/users/multi-user-applications',
          ],
        },
        {
          type: 'category',
          label: 'Sync',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/app-services/sync/overview',
            'sdk/java/app-services/sync/quick-start',
            'sdk/java/app-services/sync/open-a-synced-realm',
            'sdk/java/app-services/sync/reset-a-client-realm',
            'sdk/java/app-services/sync/flexible-sync',
            'sdk/java/app-services/sync/manual-client-reset-data-recover',
          ],
        },
        'sdk/java/app-services/functions',
        {
          type: 'category',
          label: 'Query MongoDB',
          collapsible: true,
          collapsed: true,
          items: [
            'sdk/java/app-services/mongodb/overview',
            'sdk/java/app-services/mongodb/create',
            'sdk/java/app-services/mongodb/read',
            'sdk/java/app-services/mongodb/update',
            'sdk/java/app-services/mongodb/delete',
            'sdk/java/app-services/mongodb/watch',
            'sdk/java/app-services/mongodb/aggregate',
          ],
        },
      ],
    },
    'sdk/java/threading',
    'sdk/java/testing',
    'sdk/java/logging',
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
  ],
};

module.exports = sidebars;
