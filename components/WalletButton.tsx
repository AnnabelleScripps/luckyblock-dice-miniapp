"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const preferredConnector =
    connectors.find((connector) => connector.id === "injected") ?? connectors[0];

  if (isConnected && address) {
    return (
      <button className="btn-soft" onClick={() => disconnect()}>
        {shortAddress(address)} · Disconnect
      </button>
    );
  }

  return (
    <button
      className="btn-soft"
      onClick={() => connect({ connector: preferredConnector })}
      disabled={isPending || !preferredConnector}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
