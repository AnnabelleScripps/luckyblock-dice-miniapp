"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = connectors[0];

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
      onClick={() => connect({ connector: injectedConnector })}
      disabled={isPending || !injectedConnector}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
