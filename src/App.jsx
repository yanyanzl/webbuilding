import { useState } from 'react';


export default function App() {
const [revealed, setRevealed] = useState(false);


const user = {
sun: 'Pisces',
moon: 'Cancer',
rising: 'Libra'
};


const personalizedReading = `As a ${user.sun} Sun, you are guided by intuition and compassion. Your ${user.moon} Moon reveals deep emotional tides beneath the surface, while your ${user.rising} Rising lends grace and harmony to how you move through the world. This is a period of inner alignment — trust the quiet signals guiding you forward.`;


const tarot = {
name: 'The High Priestess',
meaning: 'Inner wisdom is speaking quietly. Trust your intuition and allow hidden truths to surface.'
};


return (
<div className="max-w-3xl mx-auto px-4 pb-20">
{/* Hero */}
<div className="text-center my-16 fade-in">
<h1 className="text-4xl mb-4">Mystical Astrology</h1>
<p className="text-indigo-300">Your daily guidance — written in the stars.</p>
</div>


{/* Personalized Reading */}
<div className="card fade-in">
<h2 className="mb-2">🌟 Your Personalized Reading</h2>
<p className="text-mystic">{personalizedReading}</p>
</div>


{/* Daily Horoscope */}
<div className="card fade-in">
<h2 className="mb-2">✨ Today’s Horoscope</h2>
<p className="text-mystic">
A subtle energetic shift encourages reflection and emotional honesty. Move slowly and trust what feels aligned.
</p>
</div>


{/* Tarot Card */}
<div className="card text-center fade-in">
<h2 className="mb-4">🎴 Daily Tarot</h2>
{!revealed ? (
<button onClick={() => setRevealed(true)}>Reveal Today’s Card</button>
) : (
<div className="fade-in">
<h3 className="mt-4">{tarot.name}</h3>
<p className="text-indigo-300 mt-2">{tarot.meaning}</p>
<button
className="mt-4"
onClick={() => navigator.share?.({ title: 'My Tarot Reading', text: tarot.meaning })}
>
Share Today’s Reading ✨
</button>
</div>
)}
</div>


{/* Astrology Calendar */}
<div className="card fade-in">
<h2 className="mb-2">🌙 Astrology Calendar</h2>
<ul className="text-indigo-300">
<li>Jan 25 – Full Moon in Leo</li>
<li>Feb 9 – New Moon in Aquarius</li>
<li>Mar 20 – Spring Equinox</li>
<li>Apr 4 – Mercury Retrograde Begins</li>
</ul>
</div>
</div>
);
}
