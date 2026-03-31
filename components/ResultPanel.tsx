import type { PlayedEventResult } from "@/hooks/useTrackedDice";

type Props = {
  result?: PlayedEventResult;
  isRolling: boolean;
  fallbackMessage?: string;
};

export function ResultPanel({ result, isRolling, fallbackMessage }: Props) {
  return (
    <section className="card stack">
      <div className="row">
        <strong>Latest Result</strong>
      </div>
      <div className="row" style={{ justifyContent: "flex-start", gap: 14 }}>
        <div className={`dice-box ${isRolling ? "rolling" : ""}`}>
          {result?.dice ? result.dice : "?"}
        </div>
        <div className="stack" style={{ gap: 6 }}>
          <p className="muted">Dice: {result ? result.dice : "-"}</p>
          <strong>{result ? (result.win ? "Score +1" : "No point this round") : "No round yet"}</strong>
          {fallbackMessage ? <p className="muted">{fallbackMessage}</p> : null}
        </div>
      </div>
    </section>
  );
}
