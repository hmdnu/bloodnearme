import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Nav } from "~/components";
import { HOSPITAL_DATA } from "~/constant";

export type TDarah = {
  golDarah: string;
  stok: number;
};

export type THospital = {
  nama: string;
  email: string;
  password: string;
  alamat: string;
  noTelpon: string;
  stokDarah: TDarah[];
};

export const meta: MetaFunction = ({ params }) => {
  return [{ title: params.hospitalName?.replace("-", " ") }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  let data: THospital = {
    nama: "",
    email: "",
    password: "",
    alamat: "",
    noTelpon: "",
    stokDarah: [],
  };

  HOSPITAL_DATA.map((hospital) => {
    if (hospital.nama.toLocaleLowerCase().replace(" ", "-") === params.hospitalName) {
      data = hospital;
    }
  });

  return data;
}

export default function HospitalDetailPage() {
  const loader = useLoaderData<THospital>();

  return (
    <>
      <Nav />
      <main className="base">
        <div>
          <h1 className="heading-1">{loader.nama}</h1>

          <div className="mt-5">
            {/* hospital info */}
            <div className="flex gap-5 items-center bg-neutral-100 p-5 rounded-md w-full">
              <img src="/hospital.jpg" alt="hospital" className="w-[500px] h-fit rounded-md" />

              <div className="flex flex-col gap-5">
                <span>
                  <p>Alamat</p>
                  <p className="heading-3">{loader.alamat}</p>
                </span>
                <span>
                  <p>Email</p>
                  <p className="heading-3">{loader.email}</p>
                </span>
                <span>
                  <p>No Telepon</p>
                  <p className="heading-3">{loader.noTelpon}</p>
                </span>
                <div className="flex gap-5">
                  <button className="heading-4 bg-red-800 text-white px-4 py-2 rounded-md">Kontak</button>
                  <button className="heading-4 text-black px-4 py-2  rounded-md bg-slate-300">Map</button>
                </div>
              </div>
            </div>

            {/* blood stock */}
            <div className="mt-5">
              <h1 className="heading-2 mb-5">Stok darah</h1>

              <div className="flex bg-slate-100 w-full items-center justify-evenly rounded-md py-5">
                {loader.stokDarah.map((blood) => (
                  <div key={blood.golDarah} className="flex gap-5 p-5 border-r-2 border-slate-300 last:border-none">
                    <div>
                      <p>Gol</p>
                      <p className="heading-2">{blood.golDarah}</p>
                    </div>
                    <div>
                      <p>Stock</p>
                      <p className="heading-2"> {blood.stok}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <table className="min-w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-left">Golongan darah</th>
                    <th className="border border-gray-400 px-4 py-2 text-left">Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {loader.stokDarah.map((hospital) => (
                    <tr key={hospital.golDarah}>
                      <td className="border border-gray-400 px-4 py-2">{hospital.golDarah}</td>
                      <td className="border border-gray-400 px-4 py-2">{hospital.stok}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
