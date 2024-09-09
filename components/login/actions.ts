'use server';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn(formData);
  } catch (error) {
    return 'Something wrong';
  }
}

async function signIn(formData: FormData): Promise<string> {
  console.log(formData);
  //throw new Error('CredentialsSignin')
  return 'OK';
}
