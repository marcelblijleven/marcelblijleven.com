import headerNavLinks from "@/data/header-nav-links";
import Link from "./mdx/link";
import MobileNav from "./mobile-nav";
import SearchButton from "./search-button";
import HeaderTitle from "@/components/headerTitle";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <HeaderTitle />
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
