import { useState, useEffect } from "react";

const zodiacSigns = [
  "Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini",
  "Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"
];

function getSunSign(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const zodiacDates = [20,19,21,20,21,21,23,23,23,23,22,22];
  return day < zodiacDates[month - 1]
    ? zodiacSigns[(month + 10) % 12]
    : zodiacSigns[(month - 1) % 12];
}

function getMoonSign(date) {
  const days = Math.floor(new Date(date).getTime() / 86400000);
  return zodiacSigns[days % 12];
}

function getRisingSign(date, time) {
  if (!time) return "Unknown";
  const hour = parseInt(time.split(":")[0]);
  return zodiacSigns[hour % 12];
}

const compatibilityMap = {
  Aries: ["Leo","Sagittarius"],
  Taurus: ["Virgo","Capricorn"],
  Gemini: ["Libra","Aquarius"],
  Cancer: ["Scorpio","Pisces"],
  Leo: ["Aries","Sagittarius"],
  Virgo: ["Taurus","Capricorn"],
  Libra: ["Gemini","Aquarius"],
  Scorpio: ["Cancer","Pisces"],
  Sagittarius: ["Aries","Leo"],
  Capricorn: ["Taurus","Virgo"],
  Aquarius: ["Gemini","Libra"],
  Pisces: ["Cancer","Scorpio"],
};

const tarotDeck = [
  { name: "The Fool", meaning: "A new beginning is forming. Trust the unknown and take the first step." },
  { name: "The Magician", meaning: "You already possess the tools you need. Focused intention brings results." },
  { name: "The High Priestess", meaning: "Inner wisdom is speaking quietly. Listen beyond logic." },
  { name: "The Empress", meaning: "Nurturing energy surrounds you. Create, receive, and allow growth." },
  { name: "The Emperor", meaning: "Structure and clarity are required now. Step into leadership." },
  { name: "The Lovers", meaning: "A meaningful choice or connection is highlighted. Align with your values." },
  { name: "The Hermit", meaning: "Withdrawal brings insight. Solitude reveals truth." },
  { name: "Wheel of Fortune", meaning: "Cycles are shifting. What changes now serves your evolution." },
  { name: "The Star", meaning: "Hope is quietly returning. Trust in renewal and healing." },
  { name: "The Moon", meaning: "Uncertainty reveals hidden truths. Pay attention to dreams and intuition." },
];

const astrologyEvents = [
  { date: '2026-01-21', event: 'Full Moon in Leo' },
  { date: '2026-02-05', event: 'New Moon in Aquarius' },
  { date: '2026-03-20', event: 'Equinox & Sun enters Aries' },
  { date: '2026-04-04', event: 'Mercury Retrograde begins' },
  { date: '2026-05-05', event: 'Full Moon in Scorpio' },
  { date: '2026-06-21', event: 'Solstice & Sun enters Cancer' },
];

function aiMysticalReading({ sun, moon, rising }) {
  return `✨ AI-Guided Astrology Reading ✨\n\nWith your Sun in ${sun}, your conscious self is learning how to express purpose with clarity and courage. This period emphasizes intentional choices rather than reactive ones.\n\nYour Moon in ${moon} reveals subtle emotional patterns surfacing now. Pay attention to recurring feelings — they are messages from your inner world asking to be honored, not dismissed.\n\nYour ${rising} Rising shapes how others experience you. Recently, this energy has been especially visible, inviting you to step more confidently into your natural role.\n\nTogether, these forces suggest a phase of quiet transformation. You are not meant to rush — alignment is unfolding naturally.`;
}

function dailyHoroscope(sun) {
  return `🌙 AI Daily Horoscope 🌙\n\nToday encourages ${sun} to slow down and listen carefully. Small moments carry meaning now. Conversations, dreams, and sudden memories may reveal guidance if you stay present.`;
}

function monthlyHoroscope(sun) {
  return `✨ AI Monthly Horoscope ✨\n\nThis month, ${sun} is invited to release outdated expectations. Growth arrives through patience, not force. Focus on what feels energetically sustainable rather than what looks impressive.`;
}

function yearlyHoroscope(sun) {
  return `🌟 AI Yearly Horoscope 🌟\n\nThis year marks a deeper alignment for ${sun}. You are closing an old chapter and redefining your sense of purpose. Trust consistency over intensity — long-term clarity is being built now.`;
}

export default function AstrologyApp() {
  const [birthData, setBirthData] = useState({ date: "", time: "", place: "" });
  const [profile, setProfile] = useState(null);
  const [tarot, setTarot] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("astroProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
      setTarot(tarotDeck[Math.floor(Math.random() * tarotDeck.length)]);
    }
  }, []);

  const handleChange = (e) => {
    setBirthData({ ...birthData, [e.target.name]: e.target.value });
  };

  const generateProfile = () => {
    const sun = getSunSign(birthData.date);
    const moon = getMoonSign(birthData.date);
    const rising = getRisingSign(birthData.date, birthData.time);

    const generated = {
      ...birthData,
      sun,
      moon,
      rising,
      reading: aiMysticalReading({ sun, moon, rising }),
      daily: dailyHoroscope(sun),
      monthly: monthlyHoroscope(sun),
      yearly: yearlyHoroscope(sun),
      compatible: compatibilityMap[sun] || [],
    };

    setProfile(generated);
    setTarot(tarotDeck[Math.floor(Math.random() * tarotDeck.length)]);
    localStorage.setItem("astroProfile", JSON.stringify(generated));
  };

  if (profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-indigo-100 p-6">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl font-serif text-center">🌙 Your Cosmic Profile</h1>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow space-y-1">
            <p><strong>Sun:</strong> {profile.sun}</p>
            <p><strong>Moon:</strong> {profile.moon}</p>
            <p><strong>Rising:</strong> {profile.rising}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow whitespace-pre-line">
            <h2 className="text-xl mb-2">✨ Personalized Reading</h2>
            <p className="text-indigo-200">{profile.reading}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">🔮 Daily Horoscope</h2>
            <p className="text-indigo-200">{profile.daily}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">🌙 Monthly Horoscope</h2>
            <p className="text-indigo-200">{profile.monthly}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">🌟 Yearly Horoscope</h2>
            <p className="text-indigo-200">{profile.yearly}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">💕 Compatibility</h2>
            <p className="text-indigo-200">Best aligned with: {profile.compatible.join(", ")}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">🎴 Daily Tarot Card</h2>
            <p className="font-semibold">{tarot?.name}</p>
            <p className="text-indigo-200 mt-1">{tarot?.meaning}</p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl p-5 shadow">
            <h2 className="text-xl mb-2">🗓️ Astrology Calendar</h2>
            {astrologyEvents.map((e) => (
              <p key={e.date} className="text-indigo-200">{e.date}: {e.event}</p>
            ))}
          </div>

          <button
            onClick={() => { localStorage.removeItem("astroProfile"); setProfile(null); }}
            className="w-full bg-indigo-700 rounded-xl py-2 mt-4"
          >
            Reset Birth Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-indigo-950/40 backdrop-blur rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-serif text-center mb-2">✨ Your Astrology Portal ✨</h1>
        <p className="text-center text-sm text-indigo-300 mb-6">
          Enter your birth details to unlock your cosmic blueprint
        </p>

        <div className="space-y-4">
          <input type="date" name="date" onChange={handleChange} className="w-full p-2 rounded bg-black/40 border border-indigo-800" />
          <input type="time" name="time" onChange={handleChange} className="w-full p-2 rounded bg-black/40 border border-indigo-800" />
          <input type="text" name="place" placeholder="Place of birth" onChange={handleChange} className="w-full p-2 rounded bg-black/40 border border-indigo-800" />

          <button
            onClick={generateProfile}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-2 text-lg font-medium"
          >
            Reveal My Stars 🌌
          </button>
        </div>

        <p className="text-xs text-center text-indigo-400 mt-6">
          Your data stays on this device ✨
        </p>
      </div>
    </div>
  );
}