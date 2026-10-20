import React from "react";

const STATS = [
  { number: "2010", label: "Cambridge accredited" },
  { number: "25", label: "Max students per class" },
  { number: "IGCSE", label: "International certificate" },
  { number: "Platinum", label: "League Schools member" },
];

const StatsBar = () => (
  <div className="hp-stats-wrap">
    <div className="hp-container">
      <div className="hp-stats">
        {STATS.map((s) => (
          <div className="hp-stat" key={s.label}>
            <p className="hp-stat-number">{s.number}</p>
            <p className="hp-stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatsBar;
