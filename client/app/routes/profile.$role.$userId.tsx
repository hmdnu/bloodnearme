import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { BloodTable, Nav } from "~/components";
import { roleAuthorization } from "../lib/createCookie";
import { TBlood } from "~/types";
import { getHospital, getPatient, getOrganizer } from "~/lib/getUserData";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as { res: { name: string } }).res.name }];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const bloodStock = String(body.get("blood-stock"));

  console.log(bloodStock);

  return null;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = params.userId;
  const role = params.role;
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));

  if (!cookie) {
    return redirect("/");
  }

  const hospital = getHospital(String(userId), String(role));
  const patient = getPatient(String(userId), String(role));
  const organizer = getOrganizer(String(userId), String(role));

  return json({ res: hospital || patient || organizer, cookie });
}

export default function ProfilePage() {
  const { res, cookie } = useLoaderData<typeof loader>();

  return (
    <>
      <Nav cookie={cookie} />
      <section className="base">
        <h1 className="heading-2">{(res as { name: string }).name}</h1>

        <div className="mb-5">
          <div>
            <h2>{(res as { address: string }).address || ""} </h2>
            <h2>{(res as { phone: string }).phone || ""}</h2>
            <h2>{res.email || ""}</h2>
          </div>
        </div>

        {/* stock blood */}
        {res.role === "hospital" && (
          <div>
            <h1>Stok Darah</h1>
            <BloodTable bloodStock={(res as { bloodStock: TBlood[] }).bloodStock} />
          </div>
        )}
      </section>
    </>
  );
}
