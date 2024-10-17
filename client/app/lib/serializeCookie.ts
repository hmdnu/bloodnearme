export function serializeCookie(cookie: string) {
  const role = String(cookie).split("; ")[1].split("=")[1].trim();
  const userId = String(cookie).split("; ")[0].split("=")[1].trim();

  return {
    userId,
    role,
  };
}
