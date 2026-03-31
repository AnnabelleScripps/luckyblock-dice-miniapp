import { BottomNav } from "@/components/BottomNav";
import { DiceHeader } from "@/components/DiceHeader";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="app-shell stack">
      <DiceHeader subtitle="Rules and mechanics for this onchain points app." />
      <RuleList />
      <BottomNav />
    </main>
  );
}
