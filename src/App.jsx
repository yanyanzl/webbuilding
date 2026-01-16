import { useEffect, useState } from 'react';
return aspects;
}


// ------------------ Chart Wheel ------------------
function ChartWheel({ planets, houses }) {
return (
<svg viewBox="0 0 220 220" className="mx-auto w-72 h-72">
<circle cx="110" cy="110" r="105" stroke="#7c3aed" strokeWidth="2" fill="none" />
{SIGNS.map((s, i) => {
const a = (i * 30 - 90) * Math.PI / 180;
return <text key={s} x={110 + 85 * Math.cos(a)} y={110 + 85 * Math.sin(a)} fontSize="8" fill="#c7d2fe" textAnchor="middle">{s}</text>;
})}
{houses.map((h, i) => {
const a = (i * 30 - 90) * Math.PI / 180;
return <line key={i} x1="110" y1="110" x2={110 + 105 * Math.cos(a)} y2={110 + 105 * Math.sin(a)} stroke="#334155" />;
})}
{planets.map((p, i) => {
const idx = SIGNS.indexOf(p.sign);
const a = (idx * 30 - 90) * Math.PI / 180;
return <circle key={i} cx={110 + 65 * Math.cos(a)} cy={110 + 65 * Math.sin(a)} r="4" fill="#fde68a" />;
})}
</svg>
);
}


export default function App() {
const [birthdate, setBirthdate] = useState('');
const [time, setTime] = useState('12:00');
const [profile, setProfile] = useState(null);


function generate() {
const sun = getSunSign(birthdate);
const moon = getMoonSign(birthdate);
const rising = getRisingSign(time);
const houses = getHouses(rising);
const planets = PLANETS.map(name => ({ name, sign: name === 'Sun' ? sun : name === 'Moon' ? moon : houses[Math.floor(Math.random()*12)] }));
const aspects = getAspects(planets);
const data = { sun, moon, rising, houses, planets, aspects };
localStorage.setItem('astro-profile', JSON.stringify(data));
setProfile(data);
}


useEffect(() => {
const saved = localStorage.getItem('astro-profile');
if (saved) setProfile(JSON.parse(saved));
}, []);


return (
<div className="max-w-3xl mx-auto px-4 pb-24">
<header className="text-center my-16">
<h1 className="text-4xl">Mystical Astrology</h1>
<p className="text-indigo-300">Professional natal chart analysis</p>
</header>


{!profile && (
<div className="card">
<h2>Birth Data</h2>
<input type="date" className="w-full mb-3" onChange={e => setBirthdate(e.target.value)} />
<input type="time" className="w-full mb-4" onChange={e => setTime(e.target.value)} />
<button onClick={generate}>Generate Full Chart</button>
</div>
)}


{profile && (
<>
<div className="card">
<h2>Natal Chart</h2>
<ChartWheel planets={profile.planets} houses={profile.houses} />
<p className="text-mystic">☉ {profile.sun} ☽ {profile.moon} ↑ {profile.rising}</p>
</div>


<div className="card">
<h2>Planetary Aspects</h2>
<ul className="text-indigo-300">
{profile.aspects.map(a => <li key={a}>{a}</li>)}
</ul>
</div>


<div className="card">
<h2>House System</h2>
<ul className="text-indigo-300">
{profile.houses.map((h, i) => <li key={i}>House {i+1}: {h}</li>)}
</ul>
</div>
</>
)}
</div>
);
}