import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    headers: {
      token: token.token,
    },
  });
  const payload = await res.json();
  return NextResponse.json(payload);
}