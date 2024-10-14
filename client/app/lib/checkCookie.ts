import { roleAuthorization } from "../lib/createCookie";

export async function checkCookie(cookie: string | null) {
  return await roleAuthorization.parse(cookie);
}
