import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "./tailwind.css";
import { ContactBox, Nav } from "./components";
import { useStoreChatbox } from "./hooks/zustand";
import { roleAuthorization } from "./lib/createCookie";
import { serializeCookie } from "./lib/serializeCookie";

export const links: LinksFunction = () => [
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
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));

  const { userId, role } = serializeCookie(cookie);

  return { cookie: { userId, role } };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { cookie } = useLoaderData<typeof loader>();
  const location = useLocation();

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
