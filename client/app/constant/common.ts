export const NAV_LINK = [
  {
    name: "community",
    href: "/community",
  },

  {
    name: "login/register",
    href: "/login",
  },
];

export const ROLES = [
  {
    role: "Pasien",
    href: "/register/patient",
  },
  {
    role: "Rumah Sakit",
    href: "/register/hospital",
  },
  {
    role: "Penyelenggara",
    href: "/register/organizer",
  },
];

export const PRIVATE_ROUTE = [
  {
    href: /^\/profile\/.*$/,
  },
  {
    href: /^\/bloodstock\/.*$/,
  },
];
