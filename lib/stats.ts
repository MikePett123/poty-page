import { Team } from "./players";

export interface BattingRow {
  name: string;
  team: Team;
  inns: number;
  no: number;
  runs: number;
  hs: string;
  avg: number | null;
  fifties: number;
  hundreds: number;
  sr: string;
}

export interface BowlingRow {
  name: string;
  team: Team;
  overs: number;
  wkts: number;
  best: string;
  econ: number;
  avg: number;
}

export interface FieldingRow {
  name: string;
  team: Team;
  catches: number;
  stumpings: number;
  runOuts: number;
  totalDismissals: number;
}

export const BATTING: BattingRow[] = [
  { name: "Matt Lynch", team: "1st", inns: 13, no: 2, runs: 301, hs: "75", avg: 27.36, fifties: 2, hundreds: 0, sr: "58.38" },
  { name: "Jack Stone", team: "1st", inns: 14, no: 0, runs: 290, hs: "84", avg: 20.71, fifties: 3, hundreds: 0, sr: "80.00" },
  { name: "Kieran Gibbons", team: "1st", inns: 13, no: 1, runs: 279, hs: "62*", avg: 23.25, fifties: 1, hundreds: 0, sr: "86.99" },
  { name: "Ganesh Ghube", team: "1st", inns: 8, no: 2, runs: 187, hs: "42", avg: 31.17, fifties: 0, hundreds: 0, sr: "160.00" },
  { name: "Nabil Butt", team: "1st", inns: 10, no: 2, runs: 160, hs: "61*", avg: 20.00, fifties: 1, hundreds: 0, sr: "83.33" },
  { name: "Lewes Barham", team: "1st", inns: 8, no: 2, runs: 117, hs: "30", avg: 19.50, fifties: 0, hundreds: 0, sr: "64.62" },
  { name: "Mark Loughlin", team: "1st", inns: 9, no: 5, runs: 97, hs: "30*", avg: 24.25, fifties: 0, hundreds: 0, sr: "14.29" },
  { name: "Irfan Mirza", team: "1st", inns: 9, no: 0, runs: 77, hs: "37", avg: 8.56, fifties: 0, hundreds: 0, sr: "16.67" },
  { name: "Faizan Ahmad", team: "1st", inns: 6, no: 0, runs: 56, hs: "22", avg: 9.33, fifties: 0, hundreds: 0, sr: "10.53" },
  { name: "Seth Clifford", team: "1st", inns: 3, no: 0, runs: 32, hs: "16", avg: 10.67, fifties: 0, hundreds: 0, sr: "80.00" },
  { name: "Joshua Hills", team: "1st", inns: 4, no: 1, runs: 16, hs: "9", avg: 5.33, fifties: 0, hundreds: 0, sr: "69.23" },

  { name: "Paul Ryder", team: "2nd", inns: 13, no: 0, runs: 265, hs: "65", avg: 20.38, fifties: 1, hundreds: 0, sr: "51.16" },
  { name: "Michael Pett", team: "2nd", inns: 10, no: 1, runs: 236, hs: "78", avg: 26.22, fifties: 1, hundreds: 0, sr: "134.15" },
  { name: "Jan Najebullah", team: "2nd", inns: 7, no: 0, runs: 178, hs: "93", avg: 25.43, fifties: 1, hundreds: 0, sr: "135.71" },
  { name: "Andrew Hind", team: "2nd", inns: 8, no: 0, runs: 141, hs: "31", avg: 17.63, fifties: 0, hundreds: 0, sr: "67.39" },
  // Combined across 1st & 2nd XI — Mani and Kushwala are eligible for and play both teams
  { name: "Pawankumar Kushwala", team: "2nd", inns: 9, no: 1, runs: 114, hs: "51", avg: 14.25, fifties: 1, hundreds: 0, sr: "-" },
  { name: "Saravanan Mani", team: "2nd", inns: 10, no: 1, runs: 107, hs: "32", avg: 11.89, fifties: 0, hundreds: 0, sr: "-" },
  { name: "Duane Hall", team: "2nd", inns: 9, no: 2, runs: 78, hs: "31", avg: 11.14, fifties: 0, hundreds: 0, sr: "83.33" },
  { name: "Gary Jones", team: "2nd", inns: 3, no: 0, runs: 69, hs: "40", avg: 23.00, fifties: 0, hundreds: 0, sr: "-" },
  { name: "Kai Nye", team: "2nd", inns: 3, no: 0, runs: 63, hs: "48", avg: 21.00, fifties: 0, hundreds: 0, sr: "76.19" },
  { name: "Jacques Le Juge De Segrais", team: "2nd", inns: 9, no: 0, runs: 61, hs: "21", avg: 6.78, fifties: 0, hundreds: 0, sr: "15.38" },
  { name: "James Dilley", team: "2nd", inns: 3, no: 0, runs: 60, hs: "27", avg: 20.00, fifties: 0, hundreds: 0, sr: "-" },
  { name: "Harri Cobley", team: "2nd", inns: 5, no: 1, runs: 47, hs: "19", avg: 11.75, fifties: 0, hundreds: 0, sr: "-" },
  { name: "Matt Rudgyard", team: "2nd", inns: 6, no: 0, runs: 47, hs: "35", avg: 7.83, fifties: 0, hundreds: 0, sr: "-" },
  { name: "Martin Pett", team: "2nd", inns: 9, no: 2, runs: 42, hs: "23", avg: 6.00, fifties: 0, hundreds: 0, sr: "28.57" },
  { name: "Danial Ahmed", team: "2nd", inns: 5, no: 0, runs: 23, hs: "11", avg: 4.60, fifties: 0, hundreds: 0, sr: "-" },
  { name: "David Carey", team: "2nd", inns: 8, no: 6, runs: 16, hs: "10*", avg: 8.00, fifties: 0, hundreds: 0, sr: "50.00" },
  { name: "Justin Shill", team: "2nd", inns: 6, no: 2, runs: 13, hs: "6", avg: 3.25, fifties: 0, hundreds: 0, sr: "0.00" },
];

export const BOWLING: BowlingRow[] = [
  { name: "Mark Loughlin", team: "1st", overs: 101.0, wkts: 24, best: "4/35", econ: 3.94, avg: 16.58 },
  { name: "Lewes Barham", team: "1st", overs: 107.0, wkts: 23, best: "3/24", econ: 3.55, avg: 16.52 },
  { name: "Ganesh Ghube", team: "1st", overs: 101.4, wkts: 23, best: "4/28", econ: 3.61, avg: 15.96 },
  { name: "Faizan Ahmad", team: "1st", overs: 51.0, wkts: 8, best: "3/49", econ: 5.78, avg: 36.88 },
  { name: "Shahab Imitaz", team: "1st", overs: 15.0, wkts: 4, best: "2/37", econ: 5.93, avg: 22.25 },

  { name: "Michael Pett", team: "2nd", overs: 60.4, wkts: 17, best: "6/15", econ: 5.37, avg: 19.18 },
  // Combined across 1st & 2nd XI — Kushwala bowls for both teams
  { name: "Pawankumar Kushwala", team: "2nd", overs: 65.2, wkts: 14, best: "3/27", econ: 4.81, avg: 22.43 },
  { name: "David Carey", team: "2nd", overs: 32.0, wkts: 8, best: "2/13", econ: 5.44, avg: 21.75 },
  { name: "Saravanan Mani", team: "2nd", overs: 49.0, wkts: 7, best: "3/42", econ: 4.57, avg: 32.00 },
  { name: "Jan Najebullah", team: "2nd", overs: 52.0, wkts: 6, best: "3/14", econ: 3.81, avg: 33.00 },
  { name: "Duane Hall", team: "2nd", overs: 54.0, wkts: 5, best: "2/30", econ: 7.44, avg: 80.40 },
  { name: "Justin Shill", team: "2nd", overs: 35.4, wkts: 5, best: "2/52", econ: 5.69, avg: 40.60 },
  { name: "Jacques Le Juge De Segrais", team: "2nd", overs: 65.0, wkts: 4, best: "2/37", econ: 4.86, avg: 79.00 },
  { name: "James Dilley", team: "2nd", overs: 16.0, wkts: 3, best: "1/6", econ: 4.69, avg: 25.00 },
];

export const FIELDING: FieldingRow[] = [
  { name: "Mark Loughlin", team: "1st", catches: 8, stumpings: 0, runOuts: 2, totalDismissals: 10 },
  { name: "Matt Lynch", team: "1st", catches: 8, stumpings: 0, runOuts: 0, totalDismissals: 8 },
  { name: "Kieran Gibbons", team: "1st", catches: 7, stumpings: 0, runOuts: 0, totalDismissals: 7 },
  { name: "Lewes Barham", team: "1st", catches: 2, stumpings: 0, runOuts: 2, totalDismissals: 4 },
  { name: "Nabil Butt", team: "1st", catches: 4, stumpings: 0, runOuts: 0, totalDismissals: 4 },
  { name: "Irfan Mirza", team: "1st", catches: 3, stumpings: 0, runOuts: 1, totalDismissals: 4 },
  { name: "Ganesh Ghube", team: "1st", catches: 2, stumpings: 0, runOuts: 1, totalDismissals: 3 },
  { name: "Jack Stone", team: "1st", catches: 2, stumpings: 0, runOuts: 1, totalDismissals: 3 },

  { name: "Martin Pett", team: "2nd", catches: 1, stumpings: 5, runOuts: 0, totalDismissals: 6 },
  { name: "Duane Hall", team: "2nd", catches: 3, stumpings: 0, runOuts: 1, totalDismissals: 4 },
  { name: "Jan Najebullah", team: "2nd", catches: 4, stumpings: 0, runOuts: 0, totalDismissals: 4 },
  { name: "Paul Ryder", team: "2nd", catches: 4, stumpings: 0, runOuts: 0, totalDismissals: 4 },
  { name: "Andrew Hind", team: "2nd", catches: 2, stumpings: 0, runOuts: 1, totalDismissals: 3 },
  { name: "Michael Pett", team: "2nd", catches: 3, stumpings: 0, runOuts: 0, totalDismissals: 3 },
];
