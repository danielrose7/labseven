import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Dropbox } from "dropbox";
import fetch from "cross-fetch";
import { applyTokens } from "lib/utils";

const dbxConfig = {
  fetch,
  clientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
};

// NOTE: also in /start route
const redirectUri = process.env.DROPBOX_REDIRECT_URL;

// where admins are sent after linking w/ Dropbox from admin
// see example at https://github.com/dropbox/dropbox-sdk-js/blob/main/examples/javascript/simple-backend/code_flow_example.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // exchange code for token
  const dbx = new Dropbox(dbxConfig);
  const { result } = await dbx.auth.getAccessTokenFromCode(redirectUri, code);

  // save to kv store
  const kvDropboxBlob = (await kv.get("__dropbox_keys")) ?? {};
  applyTokens(kvDropboxBlob, result);
  await kv.set("__dropbox_keys", kvDropboxBlob);

  return NextResponse.json({
    message: "Account has been linked! You can safely close this tab.",
  });
}
