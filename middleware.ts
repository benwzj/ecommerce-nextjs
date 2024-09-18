// import { NextRequest, NextResponse } from 'next/server';

// export default async function middleware(req: NextRequest) {
//   // Decrypt the session from the cookie
//   // const cookie = cookies().get('session')?.value;
//   // const session = await decrypt(cookie);

//   // if (!session?.userId) {
//   //   return NextResponse.redirect(new URL('/login', req.nextUrl))
//   // }

//   return NextResponse.next();
// }

// // Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
// };

export { auth as middleware } from 'auth';
