import { JSONRPCMessage } from "../types.js";
import { StdioClientTransport, StdioServerParameters } from "./stdio.js";

// Use Node.js with a simple stdin->stdout pipe for reliable cross-platform testing
const getServerParameters = (): StdioServerParameters => {
  return {
    command: "node",
    args: ["-e", "process.stdin.pipe(process.stdout)"],
  };
};

const serverParameters = getServerParameters();

describe("StdioClientTransport", () => {
  test("should start then close cleanly", async () => {
    const client = new StdioClientTransport(serverParameters);

    let errorOccurred = false;
    client.onerror = (error) => {
      errorOccurred = true;
    };

    let didClose = false;
    client.onclose = () => {
      didClose = true;
    };

    try {
      await client.start();

      if (errorOccurred) {
        throw new Error("Error occurred during startup");
      }

      expect(didClose).toBeFalsy();

      await client.close();

      // Give a short time for the close event to fire
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(didClose).toBeTruthy();
    } catch (error) {
      // Clean up
      try {
        await client.close();
      } catch (closeError) {
        // Ignore cleanup errors
      }
      throw error;
    }
  });

  test("should read messages", async () => {
    const client = new StdioClientTransport(serverParameters);

    let errorOccurred = false;
    client.onerror = (error) => {
      errorOccurred = true;
    };

    const testMessage: JSONRPCMessage = {
      jsonrpc: "2.0",
      id: 1,
      method: "test",
    };

    const readMessages: JSONRPCMessage[] = [];
    const messageReceived = new Promise<void>((resolve) => {
      client.onmessage = (message) => {
        readMessages.push(message);
        if (message.id === 1) {
          resolve();
        }
      };
    });

    try {
      await client.start();

      if (errorOccurred) {
        throw new Error("Error occurred during startup");
      }

      await client.send(testMessage);

      await Promise.race([
        messageReceived,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Message receive timeout")), 2000),
        ),
      ]);

      expect(readMessages).toHaveLength(1);
      expect(readMessages[0]).toEqual(testMessage);

      await client.close();
    } catch (error) {
      // Clean up
      try {
        await client.close();
      } catch (closeError) {
        // Ignore cleanup errors
      }
      throw error;
    }
  }, 5000);

  test("should return child process pid", async () => {
    const client = new StdioClientTransport(serverParameters);

    let errorOccurred = false;
    client.onerror = (error) => {
      errorOccurred = true;
    };

    try {
      await client.start();

      if (errorOccurred) {
        throw new Error("Error occurred during startup");
      }

      expect(client.pid).not.toBeNull();
      expect(typeof client.pid).toBe("number");

      await client.close();
      expect(client.pid).toBeNull();
    } catch (error) {
      // Clean up
      try {
        await client.close();
      } catch (closeError) {
        // Ignore cleanup errors
      }
      throw error;
    }
  });
});

// Test instantiation without starting
test("StdioClientTransport can be instantiated", () => {
  const client = new StdioClientTransport(serverParameters);
  expect(client).toBeInstanceOf(StdioClientTransport);
  expect(client.pid).toBeNull(); // Should be null before starting
});
