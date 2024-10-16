import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Nav, HospitalCard, Search } from "../components/index";
import { roleAuthorization } from "~/lib/createCookie";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Bloodnearme" }, { name: "description", content: "Welcome to Bloodnearme!" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie: string = await roleAuthorization.parse(request.headers.get("Cookie"));

  if (!cookie) {
    return null;
  }

  const splited = cookie?.split("; ");
  const userId = splited[0]?.split("=")[1];
  const role = splited[1]?.split("=")[1];

  // get location

  return json({ userId, role });
}

export default function Index() {
  const res = useLoaderData<typeof loader>();

  return (
    <>
      <Nav cookie={res} />
      <main className="base">
        <Search />

        <HospitalCard />
      </main>
    </>
  );
}
