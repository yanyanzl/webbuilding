import { useEffect, useState } from "react";
import ChartWheel from "./ChartWheel"; // your existing wheel component

/*
const API_URL = import.meta.env.VITE_ASTRO_API
 || "https://astro-backend-xh5v.onrender.com";
*/
const API_URL = "https://astro-backend-xh5v.onrender.com";



// ---------- Helpers ----------
const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const degreeToSign = (deg) => SIGNS[Math.floor(deg / 30)];

function buildPlanetArray(planetsObj) {
  return Object.entries(planetsObj).map(([name, p]) => ({
    name,
    degree: p.degree,
    retrograde: p.retrograde,
    sign: degreeToSign(p.degree)
  }));
}

// ---------- Interpretation ----------
function interpretPlanet(p) {
  return `${p.name} in ${p.sign} expresses itself through this sign’s qualities.
This planet is currently at ${p.degree.toFixed(2)}°.`;
}

function interpretTransit(t) {
  return `Transit ${t.name} is currently activating ${t.sign} themes.
This influence is temporary and describes current conditions.`;
}

// ---------- App ----------
export default function App() {
  const [birthdate, setBirthdate] = useState("");
  const [time, setTime] = useState("12:00");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [profile, setProfile] = useState(null);
  const [transits, setTransits] = useState(null);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedTransit, setSelectedTransit] = useState(null);

  // ---------- Fetch from backend ----------
  async function fetchChart(datetime) {
    const res = await fetch(`${API_URL}/chart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datetime,
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error("Chart fetch failed");
    return data.chart;
  }

  async function generateChart() {
    const natalDT = `${birthdate}T${time}`;
    const natal = await fetchChart(natalDT);

    const today = new Date().toISOString().slice(0, 16);
    const transitChart = await fetchChart(today);

    const profileData = {
      planets: buildPlanetArray(natal.planets),
      houses: natal.houses.map((d) => ({ degree: d })),
      ascendant: natal.ascendant,
      mc: natal.mc
    };

    setProfile(profileData);
    setTransits(buildPlanetArray(transitChart.planets));

    localStorage.setItem("astro-profile", JSON.stringify(profileData));
  }

  // ---------- Restore saved chart ----------
  useEffect(() => {
    const saved = localStorage.getItem("astro-profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // ---------- Inspector text ----------
  let inspectorText = "Click a planet or transit to inspect.";

  if (selectedPlanet) {
    inspectorText = interpretPlanet(selectedPlanet);
  } else if (selectedTransit) {
    inspectorText = interpretTransit(selectedTransit);
  }

  // ---------- Render ----------
  return (
    <div className="max-w-3xl mx-auto px-4 pb-24 text-slate-100">
      <header className="text-center my-12">
        <h1 className="text-4xl font-serif">Mystical Astrology</h1>
        <p className="text-indigo-300">
          Swiss Ephemeris • Interactive Natal & Transits
        </p>
      </header>

      {!profile && (
        <div className="card">
          <h2 className="text-xl mb-4">Birth Data</h2>

          <input
            type="date"
            className="w-full mb-3"
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <input
            type="time"
            className="w-full mb-3"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <input
            placeholder="Latitude"
            className="w-full mb-3"
            onChange={(e) => setLat(e.target.value)}
          />

          <input
            placeholder="Longitude"
            className="w-full mb-4"
            onChange={(e) => setLon(e.target.value)}
          />

          <button onClick={generateChart}>
            Generate Chart
          </button>
        </div>
      )}

      {profile && (
        <div className="card">
          <h2 className="text-xl mb-4">Natal Chart + Transits</h2>

          <ChartWheel
            planets={profile.planets}
            houses={profile.houses}
            transits={transits}
            onPlanetSelect={(p) => {
              setSelectedPlanet(p);
              setSelectedTransit(null);
            }}
            onTransitSelect={(t) => {
              setSelectedTransit(t);
              setSelectedPlanet(null);
            }}
          />

          <div className="mt-6 p-4 bg-indigo-950 rounded-xl">
            <p className="leading-relaxed">{inspectorText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
