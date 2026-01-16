
// =====================================
// Mystical Astrology PWA – Full Interpretation Engine
// =====================================

import { useEffect, useState } from 'react';

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const PLANETS = ['Sun','Moon','Mercury','Venus','Mars'];
const PLANET_GLYPHS = { Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂' };

// Simple interpretation templates
const PLANET_SIGN_MEANINGS = {
  Sun: 'core personality, ego, and vitality',
  Moon: 'emotional world, instincts, and habits',
  Mercury: 'communication style and thought process',
  Venus: 'love, values, and attractions',
  Mars: 'drive, energy, and assertion'
};

const ASPECT_MEANINGS = {
  conjunction: 'blend of energies intensifies influence',
  opposition: 'tension and contrast that requires balance',
  square: 'challenge that prompts growth',
  trine: 'natural harmony and ease',
  sextile: 'opportunity and cooperation'
};

async function fetchEphemeris({ date, time, lat, lon }) {
  const res = await fetch("https://astro-backend-xh5v.onrender.com/chart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      datetime: birthISO,
      lat,
      lon
    })
    });

  return res.json();
}



function degreeToSign(deg) { return SIGNS[Math.floor(deg / 30)]; }

function generateInterpretation(selected, type, aspects=[], transits=[]) {
  if(type==='planet'){
    const signText = `${selected.name} in ${degreeToSign(selected.degree)} influences ${PLANET_SIGN_MEANINGS[selected.name]}`;
    const aspectText = aspects.filter(a=>a.p1===selected.name || a.p2===selected.name).map(a=>`${a.p1} ${a.type} ${a.p2} (${ASPECT_MEANINGS[a.type]})`).join('. ');
    return signText + (aspectText?'. ' + aspectText:'');
  } else if(type==='transit'){
    const aspectText = transits.filter(t=>t.name===selected.name).map(t=>`${t.name} is making an aspect to natal planets`).join('. ');
    return `${selected.name} at ${selected.degree.toFixed(1)}° (${degreeToSign(selected.degree)}) ${aspectText}`;
  } else if(type==='aspect'){
    return `${selected.p1} ${selected.type} ${selected.p2} - ${ASPECT_MEANINGS[selected.type]}`;
  }
  return '';
}

function ChartWheel({ planets, houses, aspects, transits, inspectPlanet, inspectTransit }) {
  const size = 360;
  const center = size/2;
  const radius = 150;
  const angleFromDegree = (deg) => (deg - 90) * (Math.PI/180);

  const transitAspects = [];
  if(transits){
    transits.forEach(t=>{
      planets.forEach(p=>{
        const diff=Math.abs(t.degree - p.degree) % 360;
        const orb = Math.min(diff,360-diff);
        let type=null;
        if(orb<8){ type='conjunction'; }
        else if(Math.abs(orb-180)<8){ type='opposition'; }
        else if(Math.abs(orb-90)<6){ type='square'; }
        else if(Math.abs(orb-120)<6){ type='trine'; }
        else if(Math.abs(orb-60)<4){ type='sextile'; }
        if(type) transitAspects.push({p1:p.name,p2:t.name,type,orb});
      });
    });
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="chart-wheel">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#334155" strokeWidth="2" />
      {Array.from({length:360}).map((_,d)=>{
        const angle = angleFromDegree(d);
        const r1 = radius;
        const r2 = d%30===0?radius-12:d%10===0?radius-8:radius-4;
        return <line key={d} x1={center+r1*Math.cos(angle)} y1={center+r1*Math.sin(angle)} x2={center+r2*Math.cos(angle)} y2={center+r2*Math.sin(angle)} stroke="#475569" strokeWidth={d%30===0?2:1}/>;
      })}
      {houses.map((h,i)=>{
        const angle = angleFromDegree(h.degree);
        return <line key={i} x1={center} y1={center} x2={center+radius*Math.cos(angle)} y2={center+radius*Math.sin(angle)} stroke="#64748b" strokeWidth="1" />;
      })}
      {aspects.map((a,i)=>{
        const p1=planets.find(p=>p.name===a.p1);
        const p2=planets.find(p=>p.name===a.p2);
        if(!p1||!p2)return null;
        const a1=angleFromDegree(p1.degree);
        const a2=angleFromDegree(p2.degree);
        const color=a.type==='trine'?'#2563eb':a.type==='square'||a.type==='opposition'?'#dc2626':'#16a34a';
        return <line key={i} x1={center+(radius-30)*Math.cos(a1)} y1={center+(radius-30)*Math.sin(a1)} x2={center+(radius-30)*Math.cos(a2)} y2={center+(radius-30)*Math.sin(a2)} stroke={color} strokeWidth="1" />;
      })}
      {transitAspects.map((a,i)=>{
        const p1=planets.find(p=>p.name===a.p1);
        const p2=transits.find(t=>t.name===a.p2);
        if(!p1||!p2)return null;
        const a1=angleFromDegree(p1.degree);
        const a2=angleFromDegree(p2.degree);
        const color=a.type==='trine'?'#60a5fa':a.type==='square'||a.type==='opposition'?'#f87171':'#34d399';
        return <line key={i} x1={center+(radius-20)*Math.cos(a1)} y1={center+(radius-20)*Math.sin(a1)} x2={center+(radius+15)*Math.cos(a2)} y2={center+(radius+15)*Math.sin(a2)} stroke={color} strokeWidth="1" />;
      })}
      {transits && transits.map((p,i)=>{
        const angle=angleFromDegree(p.degree);
        return <circle key={i} cx={center+(radius+15)*Math.cos(angle)} cy={center+(radius+15)*Math.sin(angle)} r={6} fill="#facc15" style={{cursor:'pointer'}} onClick={()=>inspectTransit(p)} />;
      })}
      {planets.map((p,i)=>{
        const angle=angleFromDegree(p.degree);
        return <text key={i} x={center+(radius-20)*Math.cos(angle)} y={center+(radius-20)*Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#e5e7eb" style={{cursor:'pointer'}} onClick={()=>inspectPlanet(p)}>{PLANET_GLYPHS[p.name]}</text>;
      })}
    </svg>
  );
}

export default function App() {
  const [birthdate,setBirthdate]=useState('');
  const [time,setTime]=useState('12:00');
  const [lat,setLat]=useState('');
  const [lon,setLon]=useState('');
  const [profile,setProfile]=useState(null);
  const [transits,setTransits]=useState(null);
  const [selectedPlanet,setSelectedPlanet]=useState(null);
  const [selectedTransit,setSelectedTransit]=useState(null);

  async function generate(){
    const date=new Date(birthdate);
    const eph=await fetchEphemeris({date,time,lat,lon});
    const houses=eph.houses.map(h=>({degree:h.start}));
    const planets=Object.entries(eph.planets).map(([name,p])=>({name,sign:degreeToSign(p.normDegree),degree:p.normDegree,house:''}));
    const aspects=eph.aspects.map(a=>({p1:a.planet1,p2:a.planet2,type:a.aspect,orb:a.orb}));

    const today=new Date();
    const tEph=await fetchEphemeris({date:today,time:'12:00',lat,lon});
    const tPlanets=Object.entries(tEph.planets).map(([name,p])=>({name,degree:p.normDegree}));

    const data={houses,planets,aspects};
    setProfile(data);
    setTransits(tPlanets);
    localStorage.setItem('astro-profile',JSON.stringify(data));
  }

  function inspectPlanet(p){ setSelectedPlanet(p); setSelectedTransit(null); }
  function inspectTransit(t){ setSelectedTransit(t); setSelectedPlanet(null); }

  const interpretation = selectedPlanet ? generateInterpretation(selectedPlanet,'planet',profile?.aspects,transits) : selectedTransit ? generateInterpretation(selectedTransit,'transit',[],profile?.planets) : 'Select a planet, transit, or aspect to see full interpretation.';

  useEffect(()=>{ const saved=localStorage.getItem('astro-profile'); if(saved)setProfile(JSON.parse(saved)); },[]);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-24">
      <header className="text-center my-16">
        <h1 className="text-4xl">Mystical Astrology</h1>
        <p className="text-indigo-300">Natal chart with full interactive interpretations</p>
      </header>

      {!profile&&(
        <div className="card">
          <h2>Birth Data</h2>
          <input type="date" className="w-full mb-3" onChange={e=>setBirthdate(e.target.value)}/>
          <input type="time" className="w-full mb-3" onChange={e=>setTime(e.target.value)}/>
          <input placeholder="Latitude" className="w-full mb-3" onChange={e=>setLat(e.target.value)}/>
          <input placeholder="Longitude" className="w-full mb-4" onChange={e=>setLon(e.target.value)}/>
          <button onClick={generate}>Generate Full Chart + Transits</button>
        </div>
      )}

      {profile&&(
        <div className="card">
          <h2>Natal Chart + Transits</h2>
          <ChartWheel planets={profile.planets} houses={profile.houses} aspects={profile.aspects} transits={transits} inspectPlanet={inspectPlanet} inspectTransit={inspectTransit}/>

          <div className="inspector mt-4 p-4 bg-indigo-900 rounded-xl">
            <p>{interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
