// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { signOut } from "@/lib/actions/auth.action";
import { cookies } from "next/headers";

export async function POST() {
  // Clear session cookie from browser and Firebase
  await signOut();

  // Redirect user to sign-in after logout
  return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL!));
}
