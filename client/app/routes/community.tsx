import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/react";
import { CommunityCard, Nav } from "~/components";
import { roleAuthorization } from "../lib/createCookie";

export const meta: MetaFunction = () => {
  return [{ title: "Community" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));

  return json({ cookie });
}

export default function Community() {
  return (
    <>
      <Nav />
      <section className="base grid place-content-center">
        <CommunityCard />
      </section>
    </>
  );
}
