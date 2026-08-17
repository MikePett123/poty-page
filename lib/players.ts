export type Team = "1st" | "2nd";

export interface Player {
  name: string;
  team: Team;
  stats: string;
}

// Stats format: "X Runs @ X Average, X Wickets @ X Average, X Dismissals"
function fmt(runs: number | null, bat_avg: number | null, wkts: number | null, bowl_avg: number | null, dismissals: number | null) {
  const parts: string[] = [];
  if (runs !== null) parts.push(`${runs} Runs @ ${bat_avg !== null ? bat_avg.toFixed(2) : "-"}`);
  if (wkts !== null) parts.push(`${wkts} Wickets @ ${bowl_avg !== null ? bowl_avg.toFixed(2) : "-"}`);
  if (dismissals !== null) parts.push(`${dismissals} Dismissals`);
  return parts.join(", ");
}

export const FIRST_XI: Player[] = [
  { name: "Jack Stone", team: "1st", stats: fmt(290, 20.71, null, null, 3) },
  { name: "Kieran Gibbons", team: "1st", stats: fmt(279, 23.25, null, null, 7) },
  { name: "Mark Loughlin", team: "1st", stats: fmt(97, 24.25, 24, 16.58, 10) },
  { name: "Lewes Barham", team: "1st", stats: fmt(117, 19.50, 23, 16.52, 4) },
  { name: "Nabil Butt", team: "1st", stats: fmt(160, 20.00, null, null, 4) },
  { name: "Ganesh Ghube", team: "1st", stats: fmt(187, 31.17, 23, 15.96, 3) },
  { name: "Matt Lynch", team: "1st", stats: fmt(301, 27.36, null, null, 8) },
  { name: "Faizan Ahmad", team: "1st", stats: fmt(56, 9.33, 8, 36.88, null) },
  { name: "Irfan Mirza", team: "1st", stats: fmt(77, 8.56, null, null, 4) },
  { name: "Pawankumar Kushwala", team: "1st", stats: fmt(9, 4.50, 9, 17.44, null) },
  { name: "Seth Clifford", team: "1st", stats: fmt(32, 10.67, null, null, null) },
  { name: "Joshua Hills", team: "1st", stats: fmt(16, 5.33, null, null, null) },
  { name: "Saravanan Mani", team: "1st", stats: fmt(10, 5.00, null, null, null) },
  { name: "Shahab Imitaz", team: "1st", stats: fmt(null, null, 4, 22.25, null) },
];

export const SECOND_XI: Player[] = [
  { name: "Paul Ryder", team: "2nd", stats: fmt(265, 20.38, null, null, 4) },
  { name: "Michael Pett", team: "2nd", stats: fmt(236, 26.22, 17, 19.18, 3) },
  { name: "Martin Pett", team: "2nd", stats: fmt(42, 6.00, null, null, 6) },
  { name: "David Carey", team: "2nd", stats: fmt(16, 8.00, 8, 21.75, null) },
  { name: "Duane Hall", team: "2nd", stats: fmt(78, 11.14, 5, 80.40, 4) },
  { name: "Jacques Le Juge De Segrais", team: "2nd", stats: fmt(61, 6.78, 4, 79.00, null) },
  { name: "Andrew Hind", team: "2nd", stats: fmt(141, 17.63, null, null, 3) },
  { name: "Saravanan Mani", team: "2nd", stats: fmt(97, 13.86, 7, 32.00, null) },
  { name: "Jan Najebullah", team: "2nd", stats: fmt(178, 25.43, 6, 33.00, 4) },
  { name: "Matt Rudgyard", team: "2nd", stats: fmt(47, 7.83, null, null, null) },
  { name: "Justin Shill", team: "2nd", stats: fmt(13, 3.25, 5, 40.60, null) },
  { name: "Danial Ahmed", team: "2nd", stats: fmt(23, 4.60, null, null, null) },
  { name: "Pawankumar Kushwala", team: "2nd", stats: fmt(105, 17.50, 5, 31.40, null) },
  { name: "Harri Cobley", team: "2nd", stats: fmt(47, 11.75, null, null, null) },
  { name: "Gary Jones", team: "2nd", stats: fmt(69, 23.00, null, null, null) },
  { name: "Kai Nye", team: "2nd", stats: fmt(63, 21.00, null, null, null) },
  { name: "James Dilley", team: "2nd", stats: fmt(60, 20.00, 3, 25.00, null) },
];

export const TEAMS: Record<Team, { label: string; award: string; voters: Player[] }> = {
  "1st": { label: "1st XI", award: "1st XI Player of the Year", voters: FIRST_XI },
  "2nd": { label: "2nd XI", award: "2nd XI Player of the Year", voters: SECOND_XI },
};
