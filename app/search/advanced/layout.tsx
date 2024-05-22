import AdvancedSearch from 'components/advanced-search';
import Footer from 'components/layout/footer';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="flex w-full flex-col">
          <AdvancedSearch />
          <div className="order-last min-h-screen w-full pt-5 md:order-none">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
