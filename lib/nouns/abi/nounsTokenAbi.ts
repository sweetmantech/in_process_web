export const nounsTokenAbi = [
  {
    name: "getCurrentVotes",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint96" }],
  },
  {
    name: "getPriorVotes",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "account", type: "address" },
      { name: "blockNumber", type: "uint256" },
    ],
    outputs: [{ type: "uint96" }],
  },
] as const;
