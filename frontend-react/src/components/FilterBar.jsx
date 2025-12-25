export default function FilterBar({ active, onChange }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => onChange(false)}
        style={{
          marginRight: "10px",
          background: active === false ? "#4f46e5" : "#222",
          color: "#fff",
          padding: "8px 14px",
        }}
      >
        Pending
      </button>

      <button
        onClick={() => onChange(true)}
        style={{
          background: active === true ? "#16a34a" : "#222",
          color: "#fff",
          padding: "8px 14px",
        }}
      >
        Processed
      </button>
    </div>
  );
}
