
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "node",
  projects: [
    {
      displayName: "JavaScript",
      moduleFileExtensions: ['js'],
      testMatch: [
        "<rootDir>/Examples/**/*.js",
      ],
      setupFilesAfterEnv: [
        '<rootDir>/testSetup.js',
      ],
    },
    {
      displayName: "TypeScript",
      moduleFileExtensions: ['ts', 'js'],
      preset: 'ts-jest/presets/js-with-ts',
      setupFilesAfterEnv: [
        '<rootDir>/testSetup.js',
      ],
      testMatch: [
        "<rootDir>/Examples/**/*.ts",
      ],
      "transform": {
        "^.+\\.ts$": "ts-jest"
      },
    },
    {
      displayName: "Web-JS",
      testEnvironment: "jsdom",
      moduleFileExtensions: ['js'],
      testMatch: [
        "<rootDir>/Web-Examples/**/*.js",
      ],
      setupFilesAfterEnv: [
        '<rootDir>/testSetup.js',
      ],
    },
    {
      displayName: "Web-TS",
      testEnvironment: "jsdom",
      preset: 'ts-jest/presets/js-with-ts',
      moduleFileExtensions: ['ts','js'],
      testMatch: [
        "<rootDir>/Web-Examples/**/*.ts",
      ],
      setupFilesAfterEnv: [
        '<rootDir>/testSetup.js',
      ],
    }
  ]
};