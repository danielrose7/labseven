"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getTodaysCookie } from "./utils";

export async function adminLogin(_prevState, formData) {
  // parse + validate
  const formPassword = formData.get("password");

  if (formPassword === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(getTodaysCookie(), "YES", {
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });
    const message = "Welcome to the mainframe!";
    cookieStore.set("flash:success", message, {
      maxAge: 0,
    });

    return redirect("/admin");
  }

  return { message: "No dice. Try again if you dare." };
}
