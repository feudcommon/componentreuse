import { useState } from "react";

// ─────────────────────────────────────────────
//  REUSABLE COMPONENT #1 — Badge
//  Props: label (string), variant (string)
// ─────────────────────────────────────────────
function Badge({ label, variant = "default" }) {
  const styles = {
    default: { background: "#f1f5f9", color: "#475569" },
    success: { background: "#dcfce7", color: "#16a34a" },
    danger:  { background: "#fee2e2", color: "#dc2626" },
    info:    { background: "#dbeafe", color: "#2563eb" },
    warning: { background: "#fef9c3", color: "#ca8a04" },
  };

  return (
    <span style={{
      ...styles[variant],
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      display: "inline-block",
    }}>
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
//  REUSABLE COMPONENT #2 — Avatar
//  Props: name (string), color (string)
// ─────────────────────────────────────────────
function Avatar({ name, color = "#6366f1" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: color + "22",   // low-opacity tint
      border: `2px solid ${color}44`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 13,
      flexShrink: 0,
      fontFamily: "monospace",
    }}>
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────
//  REUSABLE COMPONENT #3 — StatCard
//  Props: label, value, delta (optional)
// ─────────────────────────────────────────────
function StatCard({ label, value, delta }) {
  const positive = delta && delta.startsWith("+");

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      padding: "1rem 1.25rem",
    }}>
      <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4, fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>
        {value}
      </p>
      {delta && (
        <p style={{ fontSize: 12, marginTop: 6, color: positive ? "#16a34a" : "#dc2626" }}>
          {delta} vs last month
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  REUSABLE COMPONENT #4 — TeamMemberRow
//  Uses Avatar and Badge internally — composition!
//  Props: name, role, status, color
// ─────────────────────────────────────────────
function TeamMemberRow({ name, role, status, color }) {
  const statusVariant =
    status === "Active"   ? "success" :
    status === "On leave" ? "warning" :
    status === "Remote"   ? "info"    : "default";

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0",
      borderBottom: "1px solid #f1f5f9",
    }}>
      {/* Reusing Avatar */}
      <Avatar name={name} color={color} />

      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: 1 }}>
          {name}
        </p>
        <p style={{ fontSize: 12, color: "#64748b" }}>{role}</p>
      </div>

      {/* Reusing Badge */}
      <Badge label={status} variant={statusVariant} />
    </div>
  );
}

// ─────────────────────────────────────────────
//  REUSABLE COMPONENT #5 — Button
//  Props: children, onClick, variant
// ─────────────────────────────────────────────
function Button({ children, onClick, variant = "primary" }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    padding: "8px 18px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.15s, transform 0.1s",
    opacity: hovered ? 0.85 : 1,
    transform: hovered ? "scale(0.98)" : "scale(1)",
  };

  const variants = {
    primary:   { background: "#6366f1", color: "#fff" },
    secondary: { background: "#f1f5f9", color: "#334155" },
    danger:    { background: "#fee2e2", color: "#dc2626" },
  };

  return (
    <button
      style={{ ...base, ...variants[variant] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
//  APP — assembles everything from reusable parts
// ─────────────────────────────────────────────

const TEAM = [
  { name: "Priya Rao",    role: "Engineering Lead",  status: "Active",   color: "#6366f1" },
  { name: "Arjun Kapoor", role: "Product Designer",  status: "Remote",   color: "#0ea5e9" },
  { name: "Sara Menon",   role: "Data Analyst",      status: "On leave", color: "#f59e0b" },
  { name: "Dev Verma",    role: "DevOps Engineer",   status: "Active",   color: "#10b981" },
];

const STATS = [
  { label: "Team Members", value: "24",    delta: "+3"  },
  { label: "Open Tasks",   value: "138",   delta: "-12" },
  { label: "Velocity",     value: "91%",   delta: "+6%" },
  { label: "Incidents",    value: "2",     delta: "-5"  },
];

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      maxWidth: 680,
      margin: "0 auto",
      padding: "2rem 1.5rem",
      background: "#f8fafc",
      minHeight: "100vh",
    }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
          Component Reuse Demo
        </h1>
        <p style={{ fontSize: 14, color: "#64748b" }}>
          Every UI piece below is a reusable component. Same component, different props.
        </p>
      </div>

      {/* Stats — StatCard reused ×4 */}
      <section style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          StatCard — used 4×
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {STATS.map((s) => (
            // Same StatCard component, different label/value/delta each time
            <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
          ))}
        </div>
      </section>

      {/* Team list — TeamMemberRow reused ×4 */}
      <section style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "1.25rem",
        marginBottom: "2rem",
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          TeamMemberRow — used 4× (each uses Avatar + Badge internally)
        </p>
        {TEAM.map((member) => (
          // Same TeamMemberRow component, different data each time
          <TeamMemberRow key={member.name} {...member} />
        ))}
      </section>

      {/* Badge showcase */}
      <section style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Badge — used 5× with different variants
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge label="Default" variant="default" />
          <Badge label="Success" variant="success" />
          <Badge label="Danger"  variant="danger"  />
          <Badge label="Info"    variant="info"    />
          <Badge label="Warning" variant="warning" />
        </div>
      </section>

      {/* Button showcase + stateful interaction */}
      <section>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Button — used 3× with different variants
        </p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary"   onClick={() => setCount(c => c + 1)}>
            Clicked {count} times
          </Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            Reset
          </Button>
          <Button variant="danger"    onClick={() => alert("Danger!")}>
            Delete
          </Button>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
          All three are the same Button component — only the <code>variant</code> prop changes.
        </p>
      </section>

    </div>
  );
}