import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getTodaysCookie } from "app/log-in/utils";

export async function GET(_request) {
  const cookieStore = await cookies();

  cookieStore.delete(getTodaysCookie());
  return redirect("/log-in");
}
