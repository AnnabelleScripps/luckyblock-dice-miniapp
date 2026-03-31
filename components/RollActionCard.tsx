type Props = {
  disabled: boolean;
  onRoll: () => Promise<void> | void;
  isPending: boolean;
  canRoll: boolean;
  localSeedMissing: boolean;
  lastPlayTx?: string;
};

export function RollActionCard({
  disabled,
  onRoll,
  isPending,
  canRoll,
  localSeedMissing,
  lastPlayTx,
}: Props) {
  return (
    <section className="card stack">
      <div className="row">
        <strong>Step 2: Play</strong>
      </div>
      <p className="muted">Reveal committed seed and roll dice with interaction fee.</p>
      <button className="btn-warm" disabled={disabled || !canRoll || isPending} onClick={() => onRoll()}>
        {isPending ? "Rolling..." : "Roll Dice"}
      </button>
      {!canRoll ? <p className="muted">Commit first to unlock Roll Dice.</p> : null}
      {localSeedMissing ? (
        <p className="muted">Local seed missing. Please commit again to start a new round.</p>
      ) : null}
      {lastPlayTx ? <p className="muted">Play tx: {lastPlayTx}</p> : null}
    </section>
  );
}
