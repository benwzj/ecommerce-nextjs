import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';

import Link from 'next/link';
import { Suspense } from 'react';

import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        {/* <div className="flex w-full md:w-1/3">
            <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              <li key="thisisadvancedsearch">
                <Link
                  href="/search/advanced"
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  Models...
                </Link>
              </li>
              {menu.length &&
                menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div> */}
        <div className="hidden md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <div className="w-4/5">
              <Search />
            </div>
          </Suspense>
        </div>
        <Link href="/" className="flex w-full justify-center gap-1 md:w-1/3">
          <div className="hidden font-serif text-3xl font-bold text-amber-600 md:flex">
            SunnyDay
          </div>
          <LogoSquare />
          <div className="hidden font-serif text-3xl font-bold text-green-800 md:flex">Supply</div>
        </Link>
        <div className="flex justify-end gap-1 md:w-1/3">
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
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
