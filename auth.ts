import { createCustomerAccessToken, getCustomer } from 'lib/shopify';
import { ShopifyCustomer } from 'lib/shopify/types';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

async function getUser(email: string, password: string): Promise<ShopifyCustomer | undefined> {
  // create customerAccessToken according to email password.
  // If Success, Then SignIn success
  // If Fail, SignIn fail.
  const tokenRes = await createCustomerAccessToken(email, password);
  if (!tokenRes) return;

  if (!tokenRes.customerAccessToken) {
    console.log('createCustomerAccessToken Error: No token return');
    const message = tokenRes.customerUserErrors[0].message;
    throw new Error(message);
  }

  // fetch User information according to customerAccessToken
  const customerRes = await getCustomer(tokenRes.customerAccessToken.accessToken);
  return customerRes;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        //user = await getUserFromDb(credentials.email, pwHash)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;
          //Response.redirect(request?.url);
          return user;
        }
        return null;
      }
    })
  ]
});