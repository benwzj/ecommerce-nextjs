'use client';

import { Dialog } from '@headlessui/react';
import LogoSquare from 'components/logo-square';
import { lusitana } from 'fonts/fonts';
import { useState } from 'react';
import LoginForm from './login-form';

export default function LoginModal() {
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
            className="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
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
              <LoginForm />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
