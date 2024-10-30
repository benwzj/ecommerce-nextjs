import { createCustomerAccessToken, getCustomer } from 'lib/shopify';
import { ShopifyCustomer } from 'lib/shopify/types';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

async function getUser(email: string, password: string): Promise<ShopifyCustomer | undefined> {
  // Shopify sign in steps:
  // 1. Create customerAccessToken according to email password.
  //  - If Success, Then SignIn success.
  //  - If Fail, SignIn fail.
  // 2. Get Customer information according to customerAccessToken.
  const tokenRes = await createCustomerAccessToken(email, password);
  if (tokenRes) {
    if (tokenRes.customerAccessToken) {
      // fetch User information according to customerAccessToken
      try {
        const customerRes = await getCustomer(tokenRes.customerAccessToken.accessToken);
        console.log(`getCustomer: `);
        console.log(customerRes);
        return customerRes;
      } catch (e) {
        console.log('getCustomer fail: ' + e?.toString());
      }
    }
    console.log('createCustomerAccessToken Error: return token is null');
    const message = tokenRes.customerUserErrors[0].message;
    console.log('createCustomerAccessToken ErrorMessage: ' + message);
    //throw new Error(message);
  }
  console.log('createCustomerAccessToken Error: return null');
  return undefined;
}

// export const { handlers, signIn, signOut, auth } = NextAuth({
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
          const user = await getUser(parsedCredentials.data.email, parsedCredentials.data.password);
          if (!user) return null;
          //Response.redirect(request?.url);
          return user;
        }
        return null;
      }
    })
  ]
});
