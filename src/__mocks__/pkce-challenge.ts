import { jest } from "@jest/globals";

export default function pkceChallenge() {
  return {
    code_verifier: "test_verifier",
    code_challenge: "test_challenge",
  };
}

export const verifyChallenge = jest.fn(
  (verifier: string, challenge: string) => {
    return verifier === "test_verifier" && challenge === "test_challenge";
  },
);
