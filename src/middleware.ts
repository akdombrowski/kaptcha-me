import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("");
  // console.log("");
  // console.log("");
  // console.log("==============================");
  // console.log("START middleware");
  // console.log("==============================");
  // console.log("");
  // console.log("request.url");
  // console.log(request.url);
  // console.log(request.cookies.get("difficulty"));
  // console.log(request.cookies.get("numOptions"));
  // console.log(request.cookies.get("imgSize"));
  // console.log("");
  // console.log("==============================");
  console.log("END middleware");
  console.log("==============================");
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  // console.log("");
  // console.log("");
  console.log("");
  // return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/kaptchame/:path*",
};
