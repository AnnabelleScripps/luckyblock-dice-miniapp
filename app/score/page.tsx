"use client";

import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { DiceHeader } from "@/components/DiceHeader";
import { ScorePanel } from "@/components/ScorePanel";
import { WalletButton } from "@/components/WalletButton";
import { useLuckyDiceStats } from "@/hooks/useLuckyDiceStats";

function shortAddress(address: string | undefined) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ScorePage() {
  const { address, score, totalPlays } = useLuckyDiceStats();

  return (
    <main className="app-shell stack">
      <DiceHeader subtitle="Personal scorecard from onchain dice interactions." />

      <section className="card row">
        <div>
          <p className="muted">Address</p>
          <strong>{shortAddress(address)}</strong>
        </div>
        <WalletButton />
      </section>

      <ScorePanel score={score} totalPlays={totalPlays} />

      <section className="card stack">
        <div className="row">
          <p className="muted">Current Points</p>
          <strong className="value">{score.toString()}</strong>
        </div>
        <div className="row">
          <p className="muted">Network Total Plays</p>
          <strong className="value">{totalPlays.toString()}</strong>
        </div>
      </section>

      <Link href="/" className="btn-soft" style={{ display: "grid", placeItems: "center" }}>
        Back to Play
      </Link>

      <BottomNav />
    </main>
  );
}
