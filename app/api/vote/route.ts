import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { FIRST_XI, SECOND_XI, Team } from "@/lib/players";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const team = body.team as Team;
    const voterName = String(body.voterName ?? "");
    const nomineeName = String(body.nomineeName ?? "");

    if (team !== "1st" && team !== "2nd") {
      return NextResponse.json({ error: "Invalid team" }, { status: 400 });
    }

    const roster = team === "1st" ? FIRST_XI : SECOND_XI;
    const validVoter = roster.some((p) => p.name === voterName);
    const validNominee = roster.some((p) => p.name === nomineeName);

    if (!validVoter || !validNominee) {
      return NextResponse.json({ error: "Invalid voter or nominee for this team" }, { status: 400 });
    }

    if (voterName === nomineeName) {
      return NextResponse.json({ error: "You can't vote for yourself" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    const { data: existing, error: checkError } = await supabase
      .from("votes")
      .select("id")
      .eq("team", team)
      .eq("voter_name", voterName)
      .maybeSingle();

    if (checkError) throw checkError;
    if (existing) {
      return NextResponse.json({ error: "You have already voted for this award" }, { status: 409 });
    }

    const { error: insertError } = await supabase.from("votes").insert({
      team,
      voter_name: voterName,
      nominee_name: nomineeName,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "You have already voted for this award" }, { status: 409 });
      }
      throw insertError;
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
