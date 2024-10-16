import { Link } from "@remix-run/react";
import { useState } from "react";
import { NAV_LINK } from "~/constant";
import { useCookies } from "react-cookie";

export default function Nav({ cookie }: { cookie?: { userId: string; role: string } | null }) {
  const [navMobile, setNavMobile] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["userRole"]);

  return (
    <nav className="bg-red-900 text-white py-4 heading-5 fixed w-full z-50">
      <div className="flex justify-between w-[90%] m-auto items-center">
        <Link to={"/"}>Bloodnearme</Link>

        {/* dekstop nav link  */}
        <div className="gap-5 sm:flex hidden items-center">
          {NAV_LINK.map((nav) => (
            <div key={nav.name}>
              {nav.name === "login/register" && cookie ? (
                <button
                  onClick={() => {
                    removeCookie("userRole");
                    window.location.reload();
                  }}
                >
                  logout
                </button>
              ) : (
                <Link to={nav.href}>{nav.name}</Link>
              )}
            </div>
          ))}
          {/* profile */}
          {cookie && (
            <Link to={`/profile/${cookie?.role}/${cookie?.userId}`} className="cursor-pointer">
              <img src="/hospital.jpg" alt="profile" className="w-[35px] h-[35px] rounded-full" />
            </Link>
          )}
        </div>

        {/* mobile nav link */}
        <div className="sm:hidden flex">
          <button onClick={() => setNavMobile((e) => !e)} className="font-bold rotate-90">
            |||
          </button>

          {navMobile && (
            <div className="fixed text-black bg-slate-200 top-14 right-10 px-5 py-2 rounded-md flex flex-col gap-2">
              {NAV_LINK.map((link) => (
                <Link to={link.href} key={link.name} className="hover:underline">
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
