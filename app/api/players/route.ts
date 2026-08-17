import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { FIRST_XI, SECOND_XI } from "@/lib/players";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase.from("votes").select("team, voter_name");

    if (error) throw error;

    const voted = new Set((data ?? []).map((v) => `${v.team}::${v.voter_name}`));

    const remaining = {
      "1st": FIRST_XI.filter((p) => !voted.has(`1st::${p.name}`)),
      "2nd": SECOND_XI.filter((p) => !voted.has(`2nd::${p.name}`)),
    };

    return NextResponse.json({
      voters: remaining,
      nominees: { "1st": FIRST_XI, "2nd": SECOND_XI },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
