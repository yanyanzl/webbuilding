import { useEffect, useState } from 'react';


const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const PLANETS = ['Sun','Moon','Mercury','Venus','Mars'];


// ------------------ Astrology Math ------------------
function getSunSign(d) {
const date = new Date(d);
const m = date.getMonth() + 1;
const day = date.getDate();
if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries';
if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus';
if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini';
if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer';
if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo';
if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo';
if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra';
if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio';
if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Sagittarius';
if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Capricorn';
if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius';
return 'Pisces';
}


function getMoonSign(d) {
const days = Math.floor((new Date(d) - new Date('2000-01-01')) / 86400000);
return SIGNS[(days % 12 + 12) % 12];
}

function getRisingSign(time) {
const hour = parseInt(time.split(':')[0] || '12');
return SIGNS[(hour + 6) % 12];
}


function getHouses(rising) {
const start = SIGNS.indexOf(rising);
return Array.from({ length: 12 }, (_, i) => SIGNS[(start + i) % 12]);
}


function getAspects(planets) {
const aspects = [];
for (let i = 0; i < planets.length; i++) {
for (let j = i + 1; j < planets.length; j++) {
const a = SIGNS.indexOf(planets[i].sign);
const b = SIGNS.indexOf(planets[j].sign);
const diff = Math.abs(a - b);
if (diff === 0) aspects.push(`${planets[i].name} conjunct ${planets[j].name}`);
if (diff === 4) aspects.push(`${planets[i].name} trine ${planets[j].name}`);
if (diff === 6) aspects.push(`${planets[i].name} opposite ${planets[j].name}`);
if (diff === 3) aspects.push(`${planets[i].name} square ${planets[j].name}`);
}
}
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