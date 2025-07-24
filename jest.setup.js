// Jest setup file to ensure globals are available in ES module mode
import {
  jest,
  expect,
  test,
  it,
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";

// Make Jest globals available
global.jest = jest;
global.expect = expect;
global.test = test;
global.it = it;
global.describe = describe;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
