"use client";
import { useState } from 'react';

export default function TeamerfahrungTool() {
  const [E, setE] = useState();
  const [K, setK] = useState();
  const [F, setF] = useState();

  const calcTeamerfahrung = (E, K, Fsub) => {
    const Eadj = E - 11;
    const Kadj = K - 1;
    const Fadj = F - 1 + Fsub;
    const EK = Eadj + Kadj;

    const A = 0.1406;
    const p = 0.8859;
    const B = 0.0471;
    const C = 6.6269;
    const q = -0.2244;

    const base = Math.pow(EK, p);
    const damping = 1 + (B * (Fadj - 5)) / (1 + Math.pow(EK * C, q));
    const result = A * base * damping;
    return result;
  };

  const results = [0.0, 0.5, 0.9].map(sub => ({
    sub,
    value: calcTeamerfahrung(E, K, sub).toFixed(2)
  }));

  return (
    <div
      className="p-4 max-w-xl mx-auto min-h-screen"
      style={{ backgroundColor: '#5e935c' }} // HT-Grün
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">TeamXP Calculator  <span className="text-base italic font-normal"><em>by IanMajor (7989526)</em></span></h1>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">XP Players <span className="text-sm italic font-normal">(of all 11 players)</span></label>
            <input type="number" value={E} onChange={e => setE(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block font-semibold">XP Captain</label>
            <input type="number" value={K} onChange={e => setK(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block font-semibold">Leadership (LS) Captain</label>
            <input type="number" step="0.01" value={F} onChange={e => setF(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div className="mt-4">
            <h2 className="font-bold">expected TeamXP:</h2>
            <ul className="list-disc list-inside">
              {results.map(r => (
                <li key={r.sub}>LS Sub {r.sub.toFixed(1).replace(/^0\./, ".")}: <strong>{r.value}</strong></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
