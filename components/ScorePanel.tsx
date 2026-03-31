type Props = {
  score: bigint;
  totalPlays: bigint;
};

export function ScorePanel({ score, totalPlays }: Props) {
  return (
    <section className="card stack">
      <div className="row">
        <p className="muted">Your Score</p>
        <p className="muted">Total Plays</p>
      </div>
      <div className="row" style={{ alignItems: "end" }}>
        <div className="big-score">{score.toString()}</div>
        <div className="value">{totalPlays.toString()}</div>
      </div>
    </section>
  );
}
