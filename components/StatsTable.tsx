"use client";

import { useState } from "react";
import { BATTING, BOWLING, FIELDING } from "@/lib/stats";

type Tab = "batting" | "bowling" | "fielding";

const TABS: { key: Tab; label: string }[] = [
  { key: "batting", label: "Batting" },
  { key: "bowling", label: "Bowling" },
  { key: "fielding", label: "Fielding" },
];

function BattingTable() {
  const rows = [...BATTING].sort((a, b) => b.runs - a.runs);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-sky-300/80 uppercase text-xs tracking-wider border-b border-white/10">
            <th className="py-2 pr-3 font-semibold">Player</th>
            <th className="py-2 px-3 font-semibold text-right">Inns</th>
            <th className="py-2 px-3 font-semibold text-right">Runs</th>
            <th className="py-2 px-3 font-semibold text-right">HS</th>
            <th className="py-2 px-3 font-semibold text-right">Avg</th>
            <th className="py-2 px-3 font-semibold text-right">50s</th>
            <th className="py-2 pl-3 font-semibold text-right">SR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.team}-${r.name}`} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-2 pr-3 whitespace-nowrap">{r.name}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.inns}</td>
              <td className="py-2 px-3 text-right font-medium">{r.runs}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.hs}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.avg !== null ? r.avg.toFixed(2) : "-"}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.fifties}</td>
              <td className="py-2 pl-3 text-right text-white/70">{r.sr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BowlingTable() {
  const rows = [...BOWLING].sort((a, b) => b.wkts - a.wkts);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-sky-300/80 uppercase text-xs tracking-wider border-b border-white/10">
            <th className="py-2 pr-3 font-semibold">Player</th>
            <th className="py-2 px-3 font-semibold text-right">Overs</th>
            <th className="py-2 px-3 font-semibold text-right">Wkts</th>
            <th className="py-2 px-3 font-semibold text-right">Best</th>
            <th className="py-2 px-3 font-semibold text-right">Econ</th>
            <th className="py-2 pl-3 font-semibold text-right">Avg</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.team}-${r.name}`} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-2 pr-3 whitespace-nowrap">{r.name}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.overs.toFixed(1)}</td>
              <td className="py-2 px-3 text-right font-medium">{r.wkts}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.best}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.econ.toFixed(2)}</td>
              <td className="py-2 pl-3 text-right text-white/70">{r.avg.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FieldingTable() {
  const rows = [...FIELDING].sort((a, b) => b.totalDismissals - a.totalDismissals);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-sky-300/80 uppercase text-xs tracking-wider border-b border-white/10">
            <th className="py-2 pr-3 font-semibold">Player</th>
            <th className="py-2 px-3 font-semibold text-right">Catches</th>
            <th className="py-2 px-3 font-semibold text-right">Stumpings</th>
            <th className="py-2 px-3 font-semibold text-right">Run Outs</th>
            <th className="py-2 pl-3 font-semibold text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.team}-${r.name}`} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-2 pr-3 whitespace-nowrap">{r.name}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.catches}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.stumpings}</td>
              <td className="py-2 px-3 text-right text-white/70">{r.runOuts}</td>
              <td className="py-2 pl-3 text-right font-medium">{r.totalDismissals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StatsTable() {
  const [tab, setTab] = useState<Tab>("batting");

  return (
    <div className="mt-10 rounded-2xl border border-sky-400/20 bg-navy-800/60 backdrop-blur-sm shadow-xl shadow-black/30 overflow-hidden">
      <div className="flex border-b border-sky-400/20 bg-gradient-to-r from-navy-700 to-navy-800">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition ${
              tab === t.key
                ? "text-sky-300 border-b-2 border-sky-400 bg-white/5"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === "batting" && <BattingTable />}
        {tab === "bowling" && <BowlingTable />}
        {tab === "fielding" && <FieldingTable />}
      </div>
    </div>
  );
}
