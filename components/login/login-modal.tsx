'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  return (
    <>
      <button aria-label="Open Login Dialog" onClick={openLogin}>
        <div className="group flex h-11 items-center justify-center gap-1 text-black transition-colors dark:border-neutral-700 dark:text-white">
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 transition-all ease-in-out group-hover:scale-125"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      <Dialog open={isOpen} onClose={closeLogin} className="relative z-50">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="h-96 w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl ">
              <p className="mt-2 text-sm/6 dark:text-white/50">
                Welcome! I need your user name and passwork to login.
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={closeLogin}
                >
                  Login
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={closeLogin}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
