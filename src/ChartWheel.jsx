import React from "react";

const SIGNS = [
  "♈︎","♉︎","♊︎","♋︎","♌︎","♍︎",
  "♎︎","♏︎","♐︎","♑︎","♒︎","♓︎"
];

const PLANET_SYMBOLS = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇"
};

const CENTER = 200;
const RADIUS = 160;
const TRANSIT_RADIUS = 185;

const degToRad = (deg) => (deg - 90) * (Math.PI / 180);

function polarToXY(deg, radius) {
  const r = degToRad(deg);
  return {
    x: CENTER + radius * Math.cos(r),
    y: CENTER + radius * Math.sin(r)
  };
}

export default function ChartWheel({
  planets = [],
  houses = [],
  transits = [],
  onPlanetSelect,
  onTransitSelect
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto block max-w-full"
    >
      {/* Outer wheel */}
      <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#020617" stroke="#334155" />

      {/* Zodiac signs */}
      {SIGNS.map((s, i) => {
        const pos = polarToXY(i * 30 + 15, RADIUS + 20);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#a5b4fc"
          >
            {s}
          </text>
        );
      })}

      {/* House cusps */}
      {houses.map((h, i) => {
        const start = polarToXY(h.degree, 0);
        const end = polarToXY(h.degree, RADIUS);
        return (
          <line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="#1e293b"
          />
        );
      })}

      {/* Natal planets */}
      {planets.map((p, i) => {
        const pos = polarToXY(p.degree, RADIUS - 28);
        return (
          <g
            key={i}
            onClick={() => onPlanetSelect?.(p)}
            className="cursor-pointer"
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={12}
              fill="#020617"
              stroke="#6366f1"
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#e0e7ff"
            >
              {PLANET_SYMBOLS[p.name] || "•"}
            </text>
          </g>
        );
      })}

      {/* Transit planets */}
      {transits.map((t, i) => {
        const pos = polarToXY(t.degree, TRANSIT_RADIUS);
        return (
          <g
            key={i}
            onClick={() => onTransitSelect?.(t)}
            className="cursor-pointer"
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={10}
              fill="#020617"
              stroke="#f59e0b"
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="#fde68a"
            >
              {PLANET_SYMBOLS[t.name] || "•"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
