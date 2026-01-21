import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const cursor = searchParams?.get("cursor");
  const limit = searchParams?.get("limit") ?? 9;

  let queryRes;

  try {
    if (cursor) {
      queryRes =
        await sql`SELECT * from projects WHERE projects.id < ${cursor} ORDER BY projects.id DESC LIMIT ${limit}`;
    } else {
      queryRes =
        await sql`SELECT * from projects ORDER BY projects.id DESC LIMIT ${limit}`;
    }

    const items = queryRes?.rows ?? [];
    const nextCursor = items.length === limit ? items[limit - 1]?.id : null;

    return NextResponse.json({ items, nextCursor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
