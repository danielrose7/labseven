import { NextResponse } from "next/server";

// Called by Vercel Cron weekly to refresh product data
// Manual triggers use the admin page button instead
export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use existing deploy hook from admin page
  const DEPLOY_HOOK =
    "https://api.vercel.com/v1/integrations/deploy/prj_mpmMsTfC3Z7RdGJDKaJ4HNDcvJu2/dPyynr1IF6";

  await fetch(DEPLOY_HOOK, { method: "POST" });

  return NextResponse.json({
    triggered: true,
    timestamp: new Date().toISOString(),
  });
}
