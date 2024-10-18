import { ActionFunctionArgs, json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { HospitalCard, Search } from "../components/index";
import { roleAuthorization } from "~/lib/createCookie";
import { useLoaderData } from "@remix-run/react";
import { serializeCookie } from "~/lib/serializeCookie";

export const meta: MetaFunction = () => {
  return [{ title: "Bloodnearme" }, { name: "description", content: "Welcome to Bloodnearme!" }];
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("ok bro");
  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie: string = await roleAuthorization.parse(request.headers.get("Cookie"));

  if (!cookie) {
    return null;
  }

  const { userId, role } = serializeCookie(cookie);

  return json({ userId, role });
}

export default function Index() {
  const res = useLoaderData<typeof loader>();

  return (
    <main className="base">
      <Search />

      <HospitalCard userId={res?.userId} />
    </main>
  );
}
