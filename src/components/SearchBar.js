// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        aria-label="search city"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city (e.g., Toronto)"
        style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", minWidth: 220 }}
      />
      <button type="submit" style={{ padding: "8px 12px", borderRadius: 6 }}>Search</button>
    </form>
  );
}
