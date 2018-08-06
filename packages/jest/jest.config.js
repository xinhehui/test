module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  // testEnvironment: "node",
  testEnvironment: "jsdom",

  testURL: 'http://localhost',

  // The glob patterns Jest uses to detect test files
  // 默认情况
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ]

};
