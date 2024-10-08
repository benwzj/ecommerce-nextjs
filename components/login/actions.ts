'use server';

import { createSession, deleteSession, updateSession } from 'lib/session';
import { createCustomer, createCustomerAccessToken, getCustomer } from 'lib/shopify';
import { z } from 'zod';

export async function authenticate(prevState: string | undefined, formData: FormData) {
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

  const { email, password } = validatedFields.data;

  try {
    // create customerAccessToken according to email password.
    // If Success, Then SignIn success
    // If Fail, SignIn fail.
    const res = await createCustomerAccessToken(email, password);
    if (!res) return 'Server rejected the SignIn Request';

    console.log(res);
    if (!res.customerAccessToken) {
      const message = res.customerUserErrors[0].message;
      return message;
    }

    // fetch User information according to customerAccessToken
    const res2 = await getCustomer(res.customerAccessToken.accessToken);
    console.log(res2);

    if (!res2) return 'getCustomer failed';

    // Implement cookie-based Session management
    const sessionData = res2;
    await createSession(sessionData);

    return 'create Session! it expires in one week.';
  } catch (error) {
    console.error(error);
    return 'Something wrong';
  }
}

export async function signup(prevState: string | undefined, formData: FormData) {
  const SignInSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' })
  });

  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password')
  });

  if (!validatedFields.success) {
    return 'Validated Fields Failed. Failed to Sign In.';
  }

  const { email, password, confirmPassword } = validatedFields.data;

  if (password != confirmPassword) {
    return 'Password and Confirm Password are not same!';
  }

  try {
    // create createCustomer according to email password.
    const res = await createCustomer({ email, password });
    if (!res) return 'Server rejected the SignUp Request';
    console.log('createCustomer:  ');
    console.log(res);
    if (!res.customer) {
      const message = res.customerUserErrors[0].message;
      return message;
    }
  } catch (error) {
    console.error(error);
    return 'Something wrong';
  }
  return 'SignUp looks good!';
}

export async function logout() {
  deleteSession();
}

export async function loginState(): Promise<boolean> {
  return await updateSession();
}
