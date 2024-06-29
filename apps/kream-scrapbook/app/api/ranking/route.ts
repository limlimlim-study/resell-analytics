import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const startTime = req.nextUrl.searchParams.get("startTime");
  const endTime = req.nextUrl.searchParams.get("endTime");
  const response = await fetch(
    `http://3.35.238.143:3001/scrap/${category}?startTime=${startTime}&endTime=${endTime}`
  );

  const data = await response.json();
  return NextResponse.json(data);
}
