import { createDefaultEsmPreset } from "ts-jest";

const defaultEsmPreset = createDefaultEsmPreset();

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...defaultEsmPreset,
  injectGlobals: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^pkce-challenge$": "<rootDir>/src/__mocks__/pkce-challenge.ts",
  },
  transformIgnorePatterns: ["/node_modules/(?!eventsource)/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
};
