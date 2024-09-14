import { logout } from './actions';
import LoginModal from './login-modal';
import SignupModal from './signup-modal';

export async function Login() {
  return <LoginModal />;
}

export async function SignUp() {
  return <SignupModal />;
}

export async function Logout() {
  return (
    <>
      <form action={logout}>
        <button aria-label="Open Login Dialog" type="submit">
          <div className="group flex h-11 items-center justify-center gap-1 text-black transition-colors dark:border-neutral-700 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 transition-all ease-in-out group-hover:scale-125"
            >
              <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
            </svg>
          </div>
        </button>
      </form>
    </>
  );
}
