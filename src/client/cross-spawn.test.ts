import { jest } from "@jest/globals";
import { JSONRPCMessage } from "../types.js";

// Mock cross-spawn before importing
const mockSpawn = jest.fn();
jest.unstable_mockModule("cross-spawn", () => ({
  default: mockSpawn,
}));

// Import modules after mocking
const { StdioClientTransport, getDefaultEnvironment } = await import(
  "./stdio.js"
);

describe("StdioClientTransport using cross-spawn", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockProcess = {
      on: jest.fn((event: string, callback: () => void) => {
        if (event === "spawn") {
          setTimeout(callback, 0);
        }
        return mockProcess;
      }),
      stdin: {
        on: jest.fn(),
        write: jest.fn().mockReturnValue(true),
        once: jest.fn(),
      },
      stdout: {
        on: jest.fn(),
      },
      stderr: null,
      pid: 12345,
    };

    mockSpawn.mockImplementation(() => mockProcess);
  });

  test("should call cross-spawn correctly", async () => {
    const transport = new StdioClientTransport({
      command: "test-command",
      args: ["arg1", "arg2"],
    });

    await transport.start();

    expect(mockSpawn).toHaveBeenCalledWith(
      "test-command",
      ["arg1", "arg2"],
      expect.objectContaining({
        shell: false,
      }),
    );
  });

  test("should pass environment variables correctly", async () => {
    const customEnv = { TEST_VAR: "test-value" };
    const transport = new StdioClientTransport({
      command: "test-command",
      env: customEnv,
    });

    await transport.start();

    expect(mockSpawn).toHaveBeenCalledWith(
      "test-command",
      [],
      expect.objectContaining({
        env: {
          ...getDefaultEnvironment(),
          ...customEnv,
        },
      }),
    );
  });

  test("should use default environment when env is undefined", async () => {
    const transport = new StdioClientTransport({
      command: "test-command",
      env: undefined,
    });

    await transport.start();

    expect(mockSpawn).toHaveBeenCalledWith(
      "test-command",
      [],
      expect.objectContaining({
        env: getDefaultEnvironment(),
      }),
    );
  });

  test("should send messages correctly", async () => {
    const transport = new StdioClientTransport({
      command: "test-command",
    });

    await transport.start();

    const message: JSONRPCMessage = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "test-method",
    };

    await transport.send(message);

    const mockProcess = mockSpawn.mock.results[0]?.value;
    expect(mockProcess?.stdin?.write).toHaveBeenCalled();
  });
});
