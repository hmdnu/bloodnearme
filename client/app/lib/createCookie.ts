import { createCookie } from "@remix-run/node";

export const roleAuthorization = createCookie("userRole", {
  maxAge: 1000 * 60 * 60 * 24,
});
