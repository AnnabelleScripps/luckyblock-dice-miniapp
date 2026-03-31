type Status = "No active seed" | "Seed committed" | "Rolling..." | "Success" | "Need recommit";

const toneMap: Record<Status, string> = {
  "No active seed": "#eff3fa",
  "Seed committed": "#e9f8f5",
  "Rolling...": "#fff2cf",
  Success: "#eaf3ff",
  "Need recommit": "#ffe8d1",
};

type Props = {
  status: Status;
};

export function StatusChip({ status }: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        minHeight: 36,
        alignItems: "center",
        padding: "0 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        color: "#233245",
        background: toneMap[status],
        border: "1px solid #dbe2ee",
      }}
    >
      {status}
    </div>
  );
}
