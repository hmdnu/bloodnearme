import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useFetcher, useLoaderData } from "@remix-run/react";
import { CommunityCard, Nav } from "~/components";
import { roleAuthorization } from "../lib/createCookie";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const meta: MetaFunction = () => {
  return [{ title: "Community" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie: string = await roleAuthorization.parse(request.headers.get("Cookie"));

  if (!cookie) {
    return null;
  }

  const splited = cookie?.split("; ");
  const userId = splited[0]?.split("=")[1];
  const role = splited[1]?.split("=")[1];

  return json({ userId, role, cookie });
}

export default function Community() {
  const cookie = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <>
      <Nav cookie={cookie} />
      <section className="base grid place-content-center">
        <div className="mb-5">
          {(cookie?.cookie && cookie.role === "organizer") || cookie?.role === "hospital" ? (
            <fetcher.Form action="/" method="POST">
              <Textarea className="bg-slate-200 p-5 rounded-md resize-none" rows={5} placeholder="Buat post" />

              <div className="mt-2 flex justify-between items-end">
                <div>
                  <Label>Upload gambar</Label>
                  <Input type="file" />
                </div>

                <Button type="submit">Post</Button>
              </div>
            </fetcher.Form>
          ) : null}
        </div>

        <div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mb-5">
              <CommunityCard />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
