import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { roleAuthorization } from "~/lib/createCookie";
import { getHospital, getOrganizer, getPatient } from "~/lib/getUserData";
import { serializeCookie } from "~/lib/serializeCookie";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: "Edit " + (data as { data: { name: string } }).data.name }];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));
  const { userId, role } = serializeCookie(cookie);

  const patient = getPatient(userId, role);
  const hospital = getHospital(userId, role);
  const organizer = getOrganizer(userId, role);

  return json({ data: patient || hospital || organizer });
}

export default function EditProfilePage() {
  const { data } = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <section className="base"></section>
    </>
  );
}
