import { auth } from 'auth';
import { NextRequest } from 'next/server';

export default auth((req: NextRequest) => {
  //export default async function auth(req: NextRequest) {
  // Decrypt the session from the cookie
  // const cookie = cookies().get('session')?.value;
  // const session = await decrypt(cookie);
  // if (!session?.userId) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }
  // // Add a new header x-current-path which passes the path to downstream components
  // const headers = new Headers(req.headers);
  // headers.set('x-current-path', req.nextUrl.pathname);
  // return NextResponse.next({ headers });
});

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

// export { auth as middleware } from 'auth';
