import {
  isRouteErrorResponse,
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "./tailwind.css";
import { ContactBox, Nav } from "./components";
import { roleAuthorization } from "./lib/createCookie";
import { serializeCookie } from "./lib/serializeCookie";
import { PRIVATE_ROUTE } from "./constant/common";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/hospital.jpg",
    type: "image/jpg",
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const rawCookie = request.headers.get("Cookie");
  const url = new URL(request.url);

  const isPrivateRoute = PRIVATE_ROUTE.some((route) => route.href.test(url.pathname));

  if (isPrivateRoute && !rawCookie) {
    return redirect("/login");
  }

  if (rawCookie) {
    const cookie = await roleAuthorization.parse(rawCookie);
    const { userId, role } = serializeCookie(cookie);

    if (!userId || !role) {
      return redirect("/login");
    }

    return json({ cookie: { userId, role } });
  }

  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();

  const cookie = data?.cookie;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {!/^\/register\/.*$/.test(location.pathname) && location.pathname !== "/login" && <Nav cookie={cookie} />}
        {children}
        <ContactBox />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
