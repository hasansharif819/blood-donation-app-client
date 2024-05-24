import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];
const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log({ pathname });
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log({ pathname });

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  // if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) {
  //    return NextResponse.next();
  // }

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*", "/doctors/:page*"],
};

// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { accessToken, getFromLocalStorage } from "./utils/local-storage";
// import { authKey } from "./contants/authkey";

// type Role = keyof typeof roleBasedPrivateRoutes;

// const AuthRoutes = ["/login", "/register"];
// const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
// const roleBasedPrivateRoutes = {
//   USER: [/^\/dashboard\/user/],
//   ADMIN: [/^\/dashboard\/admin/],
// };

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   // const accessToken = cookies().get("accessToken")?.value;
//   const accessToken = localStorage.getItem("accessToken");

//   // const accessToken = getFromLocalStorage(authKey);
//   // console.log("Auth token = ", authToken);
//   // const accessToken = jwtDecode(authToken as any);
//   // const accessToken =
//   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMWMwN2E4MS02MjM2LTRjNmMtODgzMy03NTJmNmZjOGE3NmQiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTY1ODI1NDIsImV4cCI6MTcxOTE3NDU0Mn0.MhyADmz_V37aqZWiVBO78ngpuA0jZkxOqOjr7DoA-Ks";
//   console.log("Access token = ", accessToken);

//   if (!accessToken) {
//     console.log("You don't have access token");
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   console.log({ pathname });
//   console.log("First condition meet");

//   if (
//     accessToken &&
//     (commonPrivateRoutes.includes(pathname) ||
//       commonPrivateRoutes.some((route) => pathname.startsWith(route)))
//   ) {
//     return NextResponse.next();
//   }

//   let decodedData = null;

//   if (accessToken) {
//     decodedData = jwtDecode(accessToken) as any;
//   }

//   const role = decodedData?.role;

//   console.log("Decode data = ", decodedData);

//   if (role && roleBasedPrivateRoutes[role as Role]) {
//     console.log("Condition meet..........");
//     const routes = roleBasedPrivateRoutes[role as Role];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/register",
//     "/dashboard",
//     "/dashboard/:page*",
//     "/dashboard/change-password",
//   ],
// };
