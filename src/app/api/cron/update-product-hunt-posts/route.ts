import { NextResponse } from "next/server";
import { fetchAndStoreProductHuntPosts } from "@/app/feed/actions/getProductHuntPosts";

export async function POST() {
  try {
    const result = await fetchAndStoreProductHuntPosts();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch and store posts" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only accepts POST requests" },
    { status: 405 },
  );
}
