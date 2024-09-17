import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import 'server-only';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ''
): Promise<SessionPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    });
    // Typeguards:
    const isSessionPayload = (value: unknown): value is SessionPayload =>
      !!value &&
      typeof value === 'object' &&
      'email' in value &&
      typeof (value as SessionPayload).email === 'string';
    if (isSessionPayload(payload)) return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(sessionData: SessionPayload) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt(sessionData);

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  if (!session) return;
  const decrypted = await decrypt(session);
  if (!decrypted) return;

  const res = NextResponse.next();

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const encryped = await encrypt(decrypted);
  res.cookies.set('session', encryped, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
  // res.cookies.set('session', {
  //   httpOnly: true,
  //   expires: payload.expires,
  //   value: await encrypt(payload)
  // });
  return res;
}

export function deleteSession() {
  cookies().delete('session');
}
