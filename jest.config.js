// Ref: https://kulshekhar.github.io/ts-jest/docs/getting-started/installation

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.ts"],
  testEnvironment: "node",
};
