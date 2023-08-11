// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  roots: ['<rootDir>/__tests__'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?|js?|ts?)$',
  testTimeout: 30000,
};

export default config;
