import { useState } from "react";
import { NAV_LINK } from "~/constant";

export default function Nav() {
  const [navMobile, setNavMobile] = useState(false);

  return (
    <nav className="bg-red-900 text-white py-6 heading-5 fixed w-full z-50">
      <div className="flex justify-between w-[90%] m-auto">
        <a href="/">Nama</a>

        {/* dekstop nav link  */}
        <div className="gap-5 sm:flex hidden">
          {NAV_LINK.map((nav) => (
            <div key={nav.name}>
              <a href={nav.href}>{nav.name}</a>
            </div>
          ))}
        </div>

        {/* mobile nav link */}
        <div className="sm:hidden flex">
          <button onClick={() => setNavMobile((e) => !e)} className="font-bold rotate-90">
            |||
          </button>

          {navMobile && (
            <div className="fixed text-black bg-slate-200 top-14 right-10 px-5 py-2 rounded-md flex flex-col gap-2">
              {NAV_LINK.map((link) => (
                <a href={link.href} key={link.name} className="hover:underline">
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
