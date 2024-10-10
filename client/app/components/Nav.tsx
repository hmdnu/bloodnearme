import { NAV_LINK } from "~/constant";

export default function Nav() {
  return (
    <nav className="bg-red-900 text-white py-6 heading-5 fixed w-full z-50">
      <div className="flex justify-between w-[90%] m-auto">
        <a href="/">Nama</a>

        <div className="flex gap-5 ">
          {NAV_LINK.map((nav) => (
            <div key={nav.name}>
              <a href={nav.href}>{nav.name}</a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
