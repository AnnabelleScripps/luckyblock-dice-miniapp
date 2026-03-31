import type { Address } from "viem";
import { luckyBlockDiceSecureAbi } from "./abi/luckyBlockDiceSecureAbi";

// Placeholder kept for future replacement.
export const LUCKYBLOCKDICESECURE_CONTRACT_ADDRESS_PLACEHOLDER =
  "LUCKYBLOCKDICESECURE_CONTRACT_ADDRESS_PLACEHOLDER";

export const luckyBlockDiceAddress =
  "0x01e4406798f4d0a5009f2a4501ed92aef6ad4209" as Address;

export const luckyBlockDiceContract = {
  address: luckyBlockDiceAddress,
  abi: luckyBlockDiceSecureAbi,
} as const;
