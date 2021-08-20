// Ref: https://kulshekhar.github.io/ts-jest/docs/getting-started/installation

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  maxWorkers: 4,
  verbose: true
};
