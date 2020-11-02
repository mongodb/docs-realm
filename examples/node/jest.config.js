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
      displayName: "Web-JavaScript",
      testEnvironment: "jsdom",
      moduleFileExtensions: ['js'],
      testMatch: [
        "<rootDir>/Examples/**/*.js",
      ],
      setupFilesAfterEnv: [
        '<rootDir>/testSetupWeb.js',
      ],
    },
    {
      displayName: "Web-TypeScript",
      testEnvironment: "jsdom",
      moduleFileExtensions: ['ts', 'js'],
      preset: 'ts-jest/presets/js-with-ts',
      testMatch: [
        "<rootDir>/Examples/**/*.js",
      ],
      setupFilesAfterEnv: [
        '<rootDir>/testSetupWeb.js',
      ],
    },
  ]
};
