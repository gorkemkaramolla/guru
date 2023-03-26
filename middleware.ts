// // middleware.ts
// import { getToken } from 'next-auth/jwt';
// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// export async function middleware(request: NextRequest, _next: NextFetchEvent) {
//   const { pathname } = request.nextUrl;
//   const protectedPaths = ['/admin'];

//   const matchesProtectedPath = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );

//   if (matchesProtectedPath) {
//     const token = await getToken({ req: request });
//     if (!token) {
//       const url = new URL(`/`, request.url);
//       url.searchParams.set('callbackUrl', pathname);
//       return NextResponse.redirect(url);
//     }
//     if (token.role !== 'admin') {
//       const url = new URL(`/403`, request.url);
//       return NextResponse.redirect(url);
//     }
//     // else if (token.role === 'admin') {
//     //   const url = new URL(`/admin`, request.url);
//     //   return NextResponse.redirect(url);
//     // }
//   }

//   return NextResponse.next();
// }
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest, _next: NextFetchEvent) {}
