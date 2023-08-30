// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  roots: ['<rootDir>/__tests__'],
  setupFiles: ['./testSetup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?|js?|ts?)$',
  testTimeout: 30000,
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@realm/react)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
