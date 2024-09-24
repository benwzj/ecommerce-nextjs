import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { Login, Logout, SignUp } from 'components/login';
import LogoSquare from 'components/logo-square';
//import { getSession } from 'lib/session';
import { auth } from 'auth';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  //const session = await getSession();
  const session = await auth();

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
          {session ? (
            <>
              <Logout />
            </>
          ) : (
            <>
              <SignUp />
              <Login />
            </>
          )}
          {/* <Logout /><SignUp /><Login /> */}
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
