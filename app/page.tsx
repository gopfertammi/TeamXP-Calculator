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

    if (EK <= 190) {
      const a = 0.3178008, b = 7.18443562, c = 2.72439076, m = 5.0, d = 0.03667101, e = 0.00877142;
      const base = Math.pow(EK, a);
      const lead = 1 - Math.pow((7 - Fadj) / b, c);
      const sigmoid = 1 / (1 + Math.exp(-e * (EK - 150)));
      return m * base * lead * sigmoid + d;
    } else {
      const a = 0.86893593, b = 18.40997074, c = 1.03587888, m = 0.22897875, d = -6.31078421, e = 0.92018107;
      const base = Math.pow(EK, a);
      const lead = 1 - Math.pow((7 - Fadj) / b, c);
      const sigmoid = 1 / (1 + Math.exp(-e * (EK - 150)));
      return m * base * lead * sigmoid + d;
    }
  };

  const results = [0.0, 0.5, 0.9].map(sub => ({
    sub,
    value: calcTeamerfahrung(E, K, sub).toFixed(2)
  }));

  return (
    <div
      className="p-4 max-w-xl mx-auto min-h-screen"
      style={{ backgroundColor: '#5e935c' }} // extrahiertes mittleres HT-Grün aus Bild
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">TeamXP Calculator</h1>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">XP Players </label>
            <input type="number" value={E} onChange={e => setE(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block font-semibold">XP Captain </label>
            <input type="number" value={K} onChange={e => setK(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block font-semibold">Leadership Captain </label>
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
