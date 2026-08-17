"use client";

import { useMemo, useState } from "react";
import { BATTING, BOWLING, FIELDING, BattingRow, BowlingRow, FieldingRow } from "@/lib/stats";

type Tab = "batting" | "bowling" | "fielding";

const TABS: { key: Tab; label: string }[] = [
  { key: "batting", label: "Batting" },
  { key: "bowling", label: "Bowling" },
  { key: "fielding", label: "Fielding" },
];

interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "right";
  sortValue: (row: T) => number | string;
  render: (row: T) => React.ReactNode;
}

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  return (
    <span className="inline-block ml-1 w-3 text-sky-300">
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : ""}
    </span>
  );
}

function SortableTable<T>({
  rows,
  columns,
  defaultSortKey,
}: {
  rows: T[];
  columns: Column<T>[];
  defaultSortKey: string;
}) {
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return rows;
    const withValues = rows.map((r) => ({ row: r, value: col.sortValue(r) }));
    withValues.sort((a, b) => {
      const av = a.value;
      const bv = b.value;
      let cmp: number;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return direction === "asc" ? cmp : -cmp;
    });
    return withValues.map((w) => w.row);
  }, [rows, columns, sortKey, direction]);

  function handleSort(key: string) {
    if (key === sortKey) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("desc");
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-sky-300/80 uppercase text-xs tracking-wider border-b border-white/10">
            {columns.map((col, i) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`py-2 font-semibold cursor-pointer select-none hover:text-sky-200 ${
                  col.align === "right" ? "text-right" : "text-left"
                } ${i === 0 ? "pr-3" : i === columns.length - 1 ? "pl-3" : "px-3"}`}
              >
                {col.label}
                <SortIcon direction={sortKey === col.key ? direction : null} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
              {columns.map((col, i) => (
                <td
                  key={col.key}
                  className={`py-2 ${col.align === "right" ? "text-right" : "text-left"} ${
                    i === 0 ? "pr-3 whitespace-nowrap" : i === columns.length - 1 ? "pl-3" : "px-3"
                  } ${col.key === sortKey ? "text-white" : "text-white/70"}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const battingColumns: Column<BattingRow>[] = [
  { key: "name", label: "Player", sortValue: (r) => r.name, render: (r) => r.name },
  { key: "inns", label: "Inns", align: "right", sortValue: (r) => r.inns, render: (r) => r.inns },
  { key: "runs", label: "Runs", align: "right", sortValue: (r) => r.runs, render: (r) => <span className="font-medium text-white">{r.runs}</span> },
  { key: "hs", label: "HS", align: "right", sortValue: (r) => parseInt(r.hs, 10) || 0, render: (r) => r.hs },
  { key: "avg", label: "Avg", align: "right", sortValue: (r) => r.avg ?? -1, render: (r) => (r.avg !== null ? r.avg.toFixed(2) : "-") },
  { key: "fifties", label: "50s", align: "right", sortValue: (r) => r.fifties, render: (r) => r.fifties },
  { key: "sr", label: "SR", align: "right", sortValue: (r) => parseFloat(r.sr) || -1, render: (r) => r.sr },
];

const bowlingColumns: Column<BowlingRow>[] = [
  { key: "name", label: "Player", sortValue: (r) => r.name, render: (r) => r.name },
  { key: "overs", label: "Overs", align: "right", sortValue: (r) => r.overs, render: (r) => r.overs.toFixed(1) },
  { key: "wkts", label: "Wkts", align: "right", sortValue: (r) => r.wkts, render: (r) => <span className="font-medium text-white">{r.wkts}</span> },
  { key: "best", label: "Best", align: "right", sortValue: (r) => parseInt(r.best, 10) || 0, render: (r) => r.best },
  { key: "econ", label: "Econ", align: "right", sortValue: (r) => r.econ, render: (r) => r.econ.toFixed(2) },
  { key: "avg", label: "Avg", align: "right", sortValue: (r) => r.avg, render: (r) => r.avg.toFixed(2) },
];

const fieldingColumns: Column<FieldingRow>[] = [
  { key: "name", label: "Player", sortValue: (r) => r.name, render: (r) => r.name },
  { key: "catches", label: "Catches", align: "right", sortValue: (r) => r.catches, render: (r) => r.catches },
  { key: "stumpings", label: "Stumpings", align: "right", sortValue: (r) => r.stumpings, render: (r) => r.stumpings },
  { key: "runOuts", label: "Run Outs", align: "right", sortValue: (r) => r.runOuts, render: (r) => r.runOuts },
  { key: "totalDismissals", label: "Total", align: "right", sortValue: (r) => r.totalDismissals, render: (r) => <span className="font-medium text-white">{r.totalDismissals}</span> },
];

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
        {tab === "batting" && <SortableTable rows={BATTING} columns={battingColumns} defaultSortKey="runs" />}
        {tab === "bowling" && <SortableTable rows={BOWLING} columns={bowlingColumns} defaultSortKey="wkts" />}
        {tab === "fielding" && <SortableTable rows={FIELDING} columns={fieldingColumns} defaultSortKey="totalDismissals" />}
      </div>
    </div>
  );
}
