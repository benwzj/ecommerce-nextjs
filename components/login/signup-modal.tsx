'use client';

import { Dialog } from '@headlessui/react';
import LogoSquare from 'components/logo-square';
import { lusitana } from 'fonts/fonts';
import { useState } from 'react';
import SignUpForm from './signup-form';

export default function SignupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  return (
    <>
      <button aria-label="Open Login Dialog" onClick={openLogin}>
        <div className="group flex h-11 items-center justify-center gap-1 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 transition-all ease-in-out group-hover:scale-125"
          >
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
          </svg>
        </div>
      </button>
      <Dialog open={isOpen} onClose={closeLogin} className="relative z-50">
        <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="h-full w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div
                className={`${lusitana.className} mb-9 flex items-center justify-center gap-2 leading-none dark:text-white`}
              >
                <LogoSquare />
                <p className="text-[44px]">SunnyDay</p>
              </div>
              <SignUpForm />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
