import { v4 as uuidv4 } from "uuid";

// Generates a fresh cryptographically random nonce per call.
// SIWE requires at least 8 alphanumeric characters; stripping hyphens from UUID gives 32.
// Uses uuid v4 with explicit options to bypass native crypto.randomUUID(),
// which throws DOMException in Firefox on non-secure (HTTP) contexts.
export const getTimeNonce = () => uuidv4({}).replace(/-/g, "");
