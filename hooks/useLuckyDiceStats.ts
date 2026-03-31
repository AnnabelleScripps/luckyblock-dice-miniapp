"use client";

import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { zeroAddress, zeroHash } from "viem";
import { luckyBlockDiceContract } from "@/lib/contracts";

export function useLuckyDiceStats() {
  const { address } = useAccount();

  const playFeeQuery = useReadContract({
    ...luckyBlockDiceContract,
    functionName: "PLAY_FEE",
  });

  const totalPlaysQuery = useReadContract({
    ...luckyBlockDiceContract,
    functionName: "totalPlays",
  });

  const scoreQuery = useReadContract({
    ...luckyBlockDiceContract,
    functionName: "scores",
    args: [address ?? zeroAddress],
    query: { enabled: Boolean(address) },
  });

  const commitQuery = useReadContract({
    ...luckyBlockDiceContract,
    functionName: "commits",
    args: [address ?? zeroAddress],
    query: { enabled: Boolean(address) },
  });

  const score = (scoreQuery.data ?? 0n) as bigint;
  const totalPlays = (totalPlaysQuery.data ?? 0n) as bigint;
  const playFee = (playFeeQuery.data ?? 0n) as bigint;
  const currentCommit = (commitQuery.data ?? zeroHash) as `0x${string}`;
  const hasActiveCommit = Boolean(address) && currentCommit !== zeroHash;

  const isLoading =
    playFeeQuery.isLoading ||
    totalPlaysQuery.isLoading ||
    scoreQuery.isLoading ||
    commitQuery.isLoading;

  const refreshAll = async () => {
    await Promise.all([
      playFeeQuery.refetch(),
      totalPlaysQuery.refetch(),
      scoreQuery.refetch(),
      commitQuery.refetch(),
    ]);
  };

  return useMemo(
    () => ({
      address,
      score,
      totalPlays,
      playFee,
      currentCommit,
      hasActiveCommit,
      isLoading,
      refreshAll,
    }),
    [
      address,
      score,
      totalPlays,
      playFee,
      currentCommit,
      hasActiveCommit,
      isLoading,
    ]
  );
}
