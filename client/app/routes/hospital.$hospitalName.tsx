import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Nav } from "~/components";
import { Button } from "~/components/ui/button";
import { HOSPITAL_DATA } from "~/constant";
import { roleAuthorization } from "~/lib/createCookie";
import { THospital } from "~/types";

export const meta: MetaFunction = ({ params }) => {
  return [{ title: params.hospitalName?.replace("-", " ") }];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  let data: THospital = {
    id: "",
    name: "",
    role: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    bloodStock: [],
  };

  HOSPITAL_DATA.map((hospital) => {
    if (hospital.name.toLocaleLowerCase().replace(" ", "-") === params.hospitalName) {
      data = hospital;
    }
  });

  return json({ data, cookie: await roleAuthorization.parse(request.headers.get("Cookie")) });
}

export default function HospitalDetailPage() {
  const { data, cookie } = useLoaderData<typeof loader>();

  return (
    <>
      <Nav cookie={cookie} />
      <main className="base">
        <div>
          <h1 className="heading-1">{data.name}</h1>

          <div className="mt-5">
            {/* hospital info */}
            <div className="flex gap-5 items-center bg-neutral-100 p-5 rounded-md w-full">
              <img src="/hospital.jpg" alt="hospital" className="w-[500px] h-fit rounded-md" />

              <div className="flex flex-col gap-5">
                <span>
                  <p>Alamat</p>
                  <p className="heading-3">{data.address}</p>
                </span>
                <span>
                  <p>Email</p>
                  <p className="heading-3">{data.email}</p>
                </span>
                <span>
                  <p>No Telepon</p>
                  <p className="heading-3">{data.phone}</p>
                </span>
                <div className="flex gap-5">
                  <Button className="heading-4 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md">
                    Kontak
                  </Button>
                  <Button className="heading-4 text-black px-4 py-2  rounded-md bg-slate-300">Map</Button>
                </div>
              </div>
            </div>

            {/* blood stock */}
            <div className="mt-5">
              <h1 className="heading-2 mb-5">Stok darah</h1>

              <div className="flex bg-slate-100 w-full items-center justify-evenly rounded-md py-5">
                {data.bloodStock.map((blood) => (
                  <div key={blood.bloodType} className="flex gap-5 p-5 border-r-2 border-slate-300 last:border-none">
                    <div>
                      <p>Gol</p>
                      <p className="heading-2">{blood.bloodType}</p>
                    </div>
                    <div>
                      <p>Stock</p>
                      <p className="heading-2"> {blood.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
