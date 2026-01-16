import { useEffect, useState } from "react";
import ChartWheel from "./ChartWheel";

const API_URL =
  process.env.REACT_APP_ASTRO_API ||
  import.meta?.env?.VITE_ASTRO_API ||
  "https://astro-backend-xh5v.onrender.com";

const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const degreeToSign = (deg) => SIGNS[Math.floor(deg / 30)];

const interpretNatalPlanet = (p) =>
  `${p.name} in ${p.sign} (${p.degree.toFixed(2)}°)
reflects how this planetary energy is expressed in your character.`;

const interpretTransitPlanet = (p) =>
  `Transit ${p.name} in ${p.sign} (${p.degree.toFixed(2)}°)
indicates a current influence shaping events and moods.`;

export default function App() {
  const [birthdate, setBirthdate] = useState("");
  const [time, setTime] = useState("12:00");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [profile, setProfile] = useState(null);
  const [transits, setTransits] = useState([]);
  const [error, setError] = useState("");

  const [selectedNatal, setSelectedNatal] = useState(null);
  const [selectedTransit, setSelectedTransit] = useState(null);

  async function fetchChart(datetime) {
    const res = await fetch(`${API_URL}/chart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datetime,
        lat: Number(lat),
        lon: Number(lon)
      })
    });

    if (!res.ok) throw new Error("Backend error");
    return res.json();
  }

  async function generateChart() {
    try {
      setError("");

      const natalDT = `${birthdate}T${time}`;
      const natalRes = await fetchChart(natalDT);

      const now = new Date().toISOString().slice(0, 16);
      const transitRes = await fetchChart(now);

      const natal = natalRes.chart;
      const transit = transitRes.chart;

      setProfile({
        planets: Object.entries(natal.planets).map(([name, p]) => ({
          name,
          degree: p.degree,
          retrograde: p.retrograde,
          sign: degreeToSign(p.degree)
        })),
        houses: natal.houses.map((d) => ({ degree: d })),
        ascendant: natal.ascendant,
        mc: natal.mc
      });

      setTransits(
        Object.entries(transit.planets).map(([name, p]) => ({
          name,
          degree: p.degree,
          retrograde: p.retrograde,
          sign: degreeToSign(p.degree)
        }))
      );

    } catch (err) {
      console.error(err);
      setError("Failed to generate chart.");
    }
  }

  let interpretationText = "Click a planet or transit to inspect.";

  if (selectedNatal) {
    interpretationText = interpretNatalPlanet(selectedNatal);
  } else if (selectedTransit) {
    interpretationText = interpretTransitPlanet(selectedTransit);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 text-slate-100">
      <h1 className="text-3xl text-center my-8">Mystical Astrology</h1>

      {!profile && (
        <div className="card">
          <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <input placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
          <input placeholder="Longitude" onChange={(e) => setLon(e.target.value)} />
          <button onClick={generateChart}>Generate Chart</button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      )}

      {profile && (
        <>
          <ChartWheel
            planets={profile.planets}
            houses={profile.houses}
            transits={transits}
            onPlanetSelect={(p) => {
              setSelectedNatal(p);
              setSelectedTransit(null);
            }}
            onTransitSelect={(t) => {
              setSelectedTransit(t);
              setSelectedNatal(null);
            }}
          />

          <div className="mt-6 p-4 bg-indigo-950 rounded-xl">
            <p className="leading-relaxed whitespace-pre-line">
              {interpretationText}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
