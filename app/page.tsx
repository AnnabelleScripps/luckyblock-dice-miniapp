"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { CommitActionCard } from "@/components/CommitActionCard";
import { DiceHeader } from "@/components/DiceHeader";
import { PlayFeePanel } from "@/components/PlayFeePanel";
import { ResultPanel } from "@/components/ResultPanel";
import { RollActionCard } from "@/components/RollActionCard";
import { ScorePanel } from "@/components/ScorePanel";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { useLuckyDiceStats } from "@/hooks/useLuckyDiceStats";
import { useTrackedDice, type PlayedEventResult } from "@/hooks/useTrackedDice";

const SEED_STORAGE_KEY = "luckyblock_dice_seed";

function generateSeed(): bigint {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let seed = 0n;
  for (const byte of bytes) seed = (seed << 8n) + BigInt(byte);
  return seed + BigInt(Date.now());
}

function parseError(error: unknown): string {
  const text = String((error as Error)?.message ?? error).toLowerCase();
  if (text.includes("wallet_not_connected")) return "Wallet not connected.";
  if (text.includes("rejected")) return "Transaction was cancelled.";
  if (text.includes("commit")) return "No active commit found. Please commit first.";
  if (text.includes("reveal") || text.includes("seed")) {
    return "Reveal mismatch. Please recommit with a new seed.";
  }
  if (text.includes("fee") || text.includes("value")) {
    return "Interaction fee is incorrect. Please retry.";
  }
  return "Transaction failed. Please try again.";
}

export default function HomePage() {
  const { isConnected } = useAccount();
  const { commitTracked, playTracked } = useTrackedDice();
  const { score, totalPlays, playFee, hasActiveCommit, refreshAll, isLoading } = useLuckyDiceStats();

  const [localSeed, setLocalSeed] = useState<bigint | null>(null);
  const [lastCommitTx, setLastCommitTx] = useState<string>("");
  const [lastPlayTx, setLastPlayTx] = useState<string>("");
  const [isCommitting, setIsCommitting] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<PlayedEventResult | undefined>();
  const [feedback, setFeedback] = useState("Ready");

  useEffect(() => {
    const stored = sessionStorage.getItem(SEED_STORAGE_KEY);
    if (!stored) return;
    try {
      setLocalSeed(BigInt(stored));
    } catch {
      sessionStorage.removeItem(SEED_STORAGE_KEY);
    }
  }, []);

  const localSeedMissing = hasActiveCommit && !localSeed;
  const canRoll = Boolean(localSeed) && hasActiveCommit && isConnected;

  const status = useMemo(() => {
    if (isRolling) return "Rolling..." as const;
    if (canRoll) return "Seed committed" as const;
    if (localSeedMissing) return "Need recommit" as const;
    if (feedback === "Success") return "Success" as const;
    return "No active seed" as const;
  }, [canRoll, feedback, isRolling, localSeedMissing]);

  const handleCommit = async () => {
    if (!isConnected) {
      setFeedback("Wallet not connected.");
      return;
    }

    setIsCommitting(true);
    setFeedback("Submitting commit...");
    try {
      const seed = generateSeed();
      const txHash = await commitTracked(seed);
      setLocalSeed(seed);
      sessionStorage.setItem(SEED_STORAGE_KEY, seed.toString());
      setLastCommitTx(txHash);
      setFeedback("Seed committed");
      await refreshAll();
    } catch (error) {
      setFeedback(parseError(error));
    } finally {
      setIsCommitting(false);
    }
  };

  const handleRoll = async () => {
    if (!isConnected) {
      setFeedback("Wallet not connected.");
      return;
    }
    if (!localSeed) {
      setFeedback("No local seed. Please commit first.");
      return;
    }

    setIsRolling(true);
    setFeedback("Rolling...");
    try {
      const response = await playTracked(localSeed, playFee);
      setLastPlayTx(response.txHash);
      if (response.played) {
        setLastResult(response.played);
      } else {
        setFeedback("Round completed. Score updated.");
      }
      setFeedback("Success");
      setLocalSeed(null);
      sessionStorage.removeItem(SEED_STORAGE_KEY);
      await refreshAll();
    } catch (error) {
      setFeedback(parseError(error));
    } finally {
      setIsRolling(false);
    }
  };

  return (
    <main className="app-shell stack">
      <DiceHeader subtitle="Commit → Roll to earn onchain points with verifiable records." />

      <section className="card row">
        <div>
          <p className="muted">Wallet</p>
          <p className="muted">{isConnected ? "Connected" : "Not connected"}</p>
        </div>
        <WalletButton />
      </section>

      <ScorePanel score={score} totalPlays={totalPlays} />
      <PlayFeePanel playFee={playFee} />

      <section className="card row">
        <div className="stack" style={{ gap: 8 }}>
          <strong>Current Status</strong>
          <StatusChip status={status} />
        </div>
        <p className="muted" style={{ textAlign: "right" }}>
          {isLoading ? "Syncing..." : feedback}
        </p>
      </section>

      <CommitActionCard
        disabled={isCommitting || isRolling || !isConnected}
        onCommit={handleCommit}
        isPending={isCommitting}
        lastCommitTx={lastCommitTx}
      />

      <RollActionCard
        disabled={isCommitting || isRolling || !isConnected}
        onRoll={handleRoll}
        isPending={isRolling}
        canRoll={canRoll}
        localSeedMissing={localSeedMissing}
        lastPlayTx={lastPlayTx}
      />

      <ResultPanel result={lastResult} isRolling={isRolling} fallbackMessage={feedback} />

      <BottomNav />
    </main>
  );
}
