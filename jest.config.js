module.exports = {
  globals: {
    "ts-jest": {
        tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "<rootDir>/src/**/__TESTS__/**/*.test.(ts|js)"
  ],
  testEnvironment: "node"
};
