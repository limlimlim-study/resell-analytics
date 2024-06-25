import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");
  imageUrl?.replace("type=m", "type=s");
  imageUrl?.replace("type=m_webp", "type=s");
  const response = await fetch(imageUrl as string);

  return response;
}
