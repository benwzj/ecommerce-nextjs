'use server';

import { signInCustomer } from 'lib/shopify';
import { z } from 'zod';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  console.log(formData);

  try {
    const SignInSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: 'Password is too short' })
        .max(20, { message: 'Password is too long' })
    });

    const validatedFields = SignInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    });

    if (!validatedFields.success) {
      // can return more detail information
      // by reading validatedFields.error.flatten().fieldErrors
      return 'Validated Fields Failed. Failed to Sign In.';
    }

    // Prepare data for insertion into the database
    const { email, password } = validatedFields.data;

    // create customerAccessToken according to email password.
    const customerAccessToken = await signInCustomer(email, password);
    if (!customerAccessToken) return 'Server rejected the SignIn Request';

    // fetch User information accroding customerAccessToken

    // Implement cookie-based Session management
  } catch (error) {
    return 'Something wrong';
  }
  return 'just test now';
}
