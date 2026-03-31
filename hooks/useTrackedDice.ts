"use client";

import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { decodeEventLog, encodePacked, keccak256, type Hex } from "viem";
import { Attribution } from "ox/erc8021";
import { luckyBlockDiceSecureAbi } from "@/lib/abi/luckyBlockDiceSecureAbi";
import { luckyBlockDiceAddress } from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

export type PlayedEventResult = {
  dice: number;
  win: boolean;
};

export const BUILDER_CODE = "bc_2d6ubdlm";
const APP_ID = "app-008";
const APP_NAME = "LuckyBlock Dice";

const DATA_SUFFIX =
  "0x62635f3264367562646c6d0b0080218021802180218021802180218021" as Hex;
const DATA_SUFFIX_FROM_CODE = Attribution.toDataSuffix({
  // 这里替换为真实 Builder Code
  codes: [BUILDER_CODE],
}) as Hex;

if (
  process.env.NODE_ENV !== "production" &&
  DATA_SUFFIX_FROM_CODE.toLowerCase() !== DATA_SUFFIX.toLowerCase()
) {
  console.warn("Builder code dataSuffix mismatch with provided encoded string.");
}

export function useTrackedDice() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const commitTracked = async (seed: bigint): Promise<`0x${string}`> => {
    if (!address) throw new Error("WALLET_NOT_CONNECTED");
    const hash = keccak256(encodePacked(["uint256"], [seed]));

    const txHash = await writeContractAsync({
      address: luckyBlockDiceAddress,
      abi: luckyBlockDiceSecureAbi,
      functionName: "commit",
      args: [hash],
      dataSuffix: DATA_SUFFIX,
    });

    void trackTransaction(APP_ID, APP_NAME, address, txHash);
    return txHash;
  };

  const playTracked = async (
    seed: bigint,
    playFee: bigint
  ): Promise<{ txHash: `0x${string}`; played?: PlayedEventResult }> => {
    if (!address) throw new Error("WALLET_NOT_CONNECTED");

    const txHash = await writeContractAsync({
      address: luckyBlockDiceAddress,
      abi: luckyBlockDiceSecureAbi,
      functionName: "play",
      args: [seed],
      value: playFee,
      dataSuffix: DATA_SUFFIX,
    });

    void trackTransaction(APP_ID, APP_NAME, address, txHash);

    if (!publicClient) return { txHash };
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    for (const log of receipt.logs) {
      try {
        const parsed = decodeEventLog({
          abi: luckyBlockDiceSecureAbi,
          data: log.data,
          topics: log.topics,
          strict: false,
        });
        if (parsed.eventName === "Played") {
          const args = parsed.args as { dice: bigint; win: boolean };
          return {
            txHash,
            played: {
              dice: Number(args.dice),
              win: args.win,
            },
          };
        }
      } catch {}
    }

    return { txHash };
  };

  return {
    commitTracked,
    playTracked,
  };
}
