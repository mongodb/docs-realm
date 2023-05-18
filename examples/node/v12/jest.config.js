// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "node",
  projects: [
    {
      displayName: "JavaScript",
      moduleFileExtensions: ["js", "mjs"],
      testMatch: ["<rootDir>/__tests__/**/*.js"],
      setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
      modulePathIgnorePatterns: ["<rootDir>/__tests__/testFiles"],
    },
    {
      displayName: "TypeScript",
      moduleFileExtensions: ["ts", "js"],
      preset: "ts-jest/presets/js-with-ts",
      setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
      modulePathIgnorePatterns: ["<rootDir>/__tests__/testFiles"],
      testMatch: ["<rootDir>/__tests__/**/*.ts"],
      transform: {
        "^.+\\.ts$": "ts-jest",
      },
    },
  ],
};
