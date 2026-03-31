type Props = {
  disabled: boolean;
  onCommit: () => Promise<void> | void;
  isPending: boolean;
  lastCommitTx?: string;
};

export function CommitActionCard({
  disabled,
  onCommit,
  isPending,
  lastCommitTx,
}: Props) {
  return (
    <section className="card stack">
      <div className="row">
        <strong>Step 1: Commit</strong>
      </div>
      <p className="muted">Generate local seed hash and send commit transaction.</p>
      <button className="btn-main" disabled={disabled || isPending} onClick={() => onCommit()}>
        {isPending ? "Committing..." : "Commit"}
      </button>
      {lastCommitTx ? <p className="muted">Commit tx: {lastCommitTx}</p> : null}
    </section>
  );
}
