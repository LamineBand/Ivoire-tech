// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  (await cookieStore).delete("Token_Vendeur");

  return NextResponse.redirect(new URL("/", req.url));
}
