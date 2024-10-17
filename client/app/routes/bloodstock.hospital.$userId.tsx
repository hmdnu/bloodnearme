import { json, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BloodTable, Nav } from "~/components";
import { roleAuthorization } from "~/lib/createCookie";
import { getHospital } from "~/lib/getUserData";
import { TBlood, THospital } from "~/types";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as { hospital: THospital }).hospital.name }];
};

export async function action() {
  console.log("ok");

  return null;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = params.userId;

  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));

  if (!cookie) {
    return redirect("/");
  }
  const hospital = getHospital(String(userId), "hospital");

  return json({ hospital, cookie: { userId: String(userId), role: "hospital" } });
}

export default function BloodstockPage() {
  const { hospital, cookie } = useLoaderData<typeof loader>();

  return (
    <>
      <section className="base">
        <div>
          <h1 className="heading-2">Stok darah {hospital?.name}</h1>
        </div>

        <BloodTable bloodStock={hospital?.bloodStock as TBlood[]} />
      </section>
    </>
  );
}
