import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { HOSPITAL_DATA } from "~/constant";
import { useStoreChatbox } from "~/hooks/zustand";
import { THospital } from "~/types";

export const meta: MetaFunction = ({ params }) => {
  return [{ title: params.hospitalName?.replace("-", " ") }];
};

export async function loader({ params }: LoaderFunctionArgs) {
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

  return json({ data });
}

export default function HospitalDetailPage() {
  const { data } = useLoaderData<typeof loader>();
  const { setOpenChatbox, setUserId } = useStoreChatbox();

  return (
    <section className="base">
      <h1 className="heading-1">{data.name}</h1>

      <div className="mt-5">
        {/* hospital info */}
        <div className="flex sm:flex-row flex-col gap-5 sm:items-center items-start bg-neutral-100 p-5 rounded-md w-full">
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
              <Button
                onClick={() => {
                  setOpenChatbox();
                  setUserId(data.id);
                }}
                className="heading-4 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md"
              >
                Kontak
              </Button>
              <Button className="heading-4 text-black px-4 py-2  rounded-md bg-slate-300">Map</Button>
            </div>
          </div>
        </div>

        {/* blood stock */}
        <div className="mt-5">
          <h1 className="heading-2 mb-5">Stok darah</h1>

          <div className="bg-slate-100 w-full grid lg:grid-cols-8 sm:grid-cols-4 grid-cols-2 gap-5 justify-items-center place-items-center rounded-md py-5">
            {data.bloodStock.map((blood) => (
              <div key={blood.bloodType} className="flex gap-3">
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
    </section>
  );
}
