"use client";

import { useEffect, useMemo, useState } from "react";
import { Player, Team, TEAMS } from "@/lib/players";
import StatsTable from "@/components/StatsTable";

type PlayersResponse = {
  voters: Record<Team, Player[]>;
  nominees: Record<Team, Player[]>;
};

function VoteCard({
  team,
  voters,
  nominees,
  onVoted,
}: {
  team: Team;
  voters: Player[];
  nominees: Player[];
  onVoted: (team: Team, voterName: string) => void;
}) {
  const meta = TEAMS[team];
  const [voterName, setVoterName] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const canVote = voters.length > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!voterName || !nomineeName) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team, voterName, nomineeName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error ?? "Something went wrong" });
      } else {
        setMessage({ type: "ok", text: `Thanks ${voterName.split(" ")[0]}, your vote is in!` });
        onVoted(team, voterName);
        setVoterName("");
        setNomineeName("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error — please try again" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 min-w-[300px] rounded-2xl border border-sky-400/20 bg-navy-800/60 backdrop-blur-sm shadow-xl shadow-black/30 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-navy-700 to-navy-800 border-b border-sky-400/20">
        <h2 className="text-lg font-bold tracking-wide text-sky-300 uppercase">{meta.label}</h2>
        <p className="text-sm text-white/70">{meta.award}</p>
      </div>

      <form onSubmit={submit} className="p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300/80 mb-1.5">
            Your name
          </label>
          <select
            required
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            disabled={!canVote}
            className="w-full rounded-lg bg-navy-900 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-40"
          >
            <option value="">Select your name…</option>
            {voters.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          {!canVote && (
            <p className="mt-1.5 text-xs text-white/50">Everyone eligible has already voted — thank you!</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300/80 mb-1.5">
            Vote for {meta.award}
          </label>
          <select
            required
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            disabled={!canVote}
            className="w-full rounded-lg bg-navy-900 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-40"
          >
            <option value="">Select a nominee…</option>
            {nominees.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} — {p.stats}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!canVote || submitting || !voterName || !nomineeName}
          className="w-full rounded-lg bg-sky-400 text-navy-950 font-semibold py-2.5 hover:bg-sky-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Cast Vote"}
        </button>

        {message && (
          <p
            className={`text-sm rounded-lg px-3 py-2 ${
              message.type === "ok"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
                : "bg-red-500/15 text-red-300 border border-red-400/20"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/players", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || json.error) {
        setLoadError(json.error ?? "Failed to load players");
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setLoadError("Network error — please refresh");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleVoted() {
    load();
  }

  return (
    <main className="min-h-screen stripe-flags">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-sky-300 tracking-[0.3em] text-xs font-semibold uppercase mb-2">Season Awards</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Player of the Year
          </h1>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Cast your vote below. Each player can vote once for the award they&apos;re eligible for —
            your name will disappear from the list once your vote is in.
          </p>
        </div>

        {loading && <p className="text-center text-white/50">Loading…</p>}

        {loadError && (
          <p className="text-center text-red-300 bg-red-500/10 border border-red-400/20 rounded-lg px-4 py-3 max-w-md mx-auto">
            {loadError}
          </p>
        )}

        {data && (
          <div className="flex flex-col md:flex-row gap-6">
            <VoteCard
              team="1st"
              voters={data.voters["1st"]}
              nominees={data.nominees["1st"]}
              onVoted={handleVoted}
            />
            <VoteCard
              team="2nd"
              voters={data.voters["2nd"]}
              nominees={data.nominees["2nd"]}
              onVoted={handleVoted}
            />
          </div>
        )}

        <StatsTable />

        <p className="text-center text-white/30 text-xs mt-12">Votes are recorded privately — results are not shown publicly.</p>
      </div>
    </main>
  );
}
