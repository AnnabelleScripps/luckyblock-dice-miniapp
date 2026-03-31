type Props = {
  subtitle: string;
};

export function DiceHeader({ subtitle }: Props) {
  return (
    <header className="card stack">
      <p className="muted" style={{ marginBottom: 2 }}>
        Base Mini App
      </p>
      <h1 className="title">LuckyBlock Dice</h1>
      <p className="muted">{subtitle}</p>
    </header>
  );
}
