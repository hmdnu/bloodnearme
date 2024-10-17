import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { roleAuthorization } from "../lib/createCookie";
import { getHospital, getPatient, getOrganizer } from "~/lib/getUserData";
import { Button } from "~/components/ui/button";
import { POST } from "~/constant";
import CommunityCard from "../components/cards/CommunityCard";
import { serializeCookie } from "~/lib/serializeCookie";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as { res: { name: string } }).res.name }];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const bloodStock = String(body.get("blood-stock"));

  console.log(bloodStock);

  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));
  const { userId, role } = serializeCookie(cookie);

  if (!cookie) {
    return redirect("/");
  }

  const hospital = getHospital(String(userId), String(role));
  const patient = getPatient(String(userId), String(role));
  const organizer = getOrganizer(String(userId), String(role));

  return json({ res: hospital || patient || organizer, cookie: { userId, role } });
}

export default function ProfilePage() {
  const { res, cookie } = useLoaderData<typeof loader>();

  return (
    <>
      <section className="base cursor-default">
        {/* profile */}
        <div className="mb-5 flex items-center justify-center sm:justify-start gap-5 bg-slate-200 p-5 rounded-md">
          <div>
            <img src="/hospital.jpg" alt="profile" className="w-[100px] h-[100px] object-cover rounded-full" />
          </div>
          <div>
            <h1 className="heading-2">{(res as { name: string }).name}</h1>
            <Link to={`mailto:${res.email}`} className="hover:underline">
              {res.email || ""}
            </Link>
            <h2>{(res as { address: string }).address || ""} </h2>
            <h2>{(res as { phone: string }).phone || ""}</h2>
          </div>
        </div>

        <div className="flex gap-3">
          {cookie && (
            <Link
              className="bg-red-800 hover:bg-red-900 text-white px-5 py-2 rounded-md transition-all"
              to={`/profile/edit/${res.role}/${res.id}`}
            >
              Edit profil
            </Link>
          )}

          {/* stock blood */}
          {cookie && res.role === "hospital" && (
            <Link
              to={`/bloodstock/hospital/${res.id}`}
              className="bg-red-800 hover:bg-red-900 text-white px-5 py-2 rounded-md transition-all"
            >
              Stok Darah
            </Link>
          )}
        </div>

        {/* history event */}
        <div className="mt-5">
          <h1 className="heading-1">Event</h1>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center md:justify-start my-5">
            {cookie.role === "organizer" ||
              (cookie.role === "hospital" &&
                POST.filter((post) => post.id === res.id && post.organizerName === res.name).map((post) => (
                  <div key={post.id}>
                    <CommunityCard post={post} />
                  </div>
                )))}
          </div>
        </div>
      </section>
    </>
  );
}
