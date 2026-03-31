import { formatEther } from "viem";

type Props = {
  playFee: bigint;
};

export function PlayFeePanel({ playFee }: Props) {
  return (
    <section className="card stack">
      <div className="row">
        <p className="muted">Interaction Fee</p>
        <strong className="value">{formatEther(playFee)} ETH</strong>
      </div>
      <p className="muted">Each roll is an onchain interaction with a fixed play fee.</p>
    </section>
  );
}
