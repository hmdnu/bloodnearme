import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Nav } from "~/components";
import { roleAuthorization } from "~/lib/createCookie";

const roles = ["hospital", "patient", "organizer"];

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = await roleAuthorization.parse(request.headers.get("Cookie"));

  const checkCookies = roles.find((role) => role === cookie);

  if (!checkCookies) {
    return redirect("/");
  }

  return null;
}

export default function DashboardHospitalPage() {
  return (
    <>
      <Nav />
      <section className="base"></section>
    </>
  );
}
