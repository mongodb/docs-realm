// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  projects: [
    {
      displayName: "JavaScript",
      moduleFileExtensions: ["js", "mjs"],
      testMatch: ["<rootDir>/compiled-js/**/*.js"],
      setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
      modulePathIgnorePatterns: ["<rootDir>/__tests__/testFiles"],
    },
    {
      displayName: "TypeScript",
      moduleFileExtensions: ["ts", "js"],
      preset: "ts-jest/presets/js-with-ts",
      setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
      modulePathIgnorePatterns: ["<rootDir>/__tests__/testFiles"],
      testMatch: ["<rootDir>/__tests__/**/*.ts"],
      transform: {
        "^.+\\.ts$": "ts-jest",
      },
    },
  ],
};

export default config;
