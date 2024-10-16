import { Input } from "~/components/ui/input";
import { Form } from "@remix-run/react";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TProvince, TRegencie, Location } from "~/lib/location";
import { useEffect, useState } from "react";

type TProps = {
  provincies: TProvince[] | undefined;
  regencies: TRegencie[] | undefined;
};

export default function Search() {
  const [location, setLocation] = useState<TProps>({ provincies: [], regencies: [] });
  // const [value, setValue] = useState("");

  const form = useForm();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("province")) {
        const provincies = await new Location().getProvince();

        localStorage.setItem("province", JSON.stringify({ provincies }));
        return;
      }

      const provincies = JSON.parse(localStorage.getItem("province")!).provincies;
      setLocation({ ...location, provincies: provincies });
    })();
  }, []);

  return (
    <>
      <div className="w-[300px] mx-auto mb-5">
        <div className="flex items-center gap-3">
          <FormProvider {...form}>
            <Form method="POST">
              <FormField
                control={form.control}
                name="search-hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="cari rumah sakit" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form>
          </FormProvider>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <img src="/filter.png" alt="filter" className="w-[20px] h-[20px]" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Filter</DialogTitle>
                <div>
                  <div className="flex flex-col">
                    <label className="heading-4" htmlFor="provinces">
                      Provinsi
                    </label>

                    <select name="provinces" id="provinces">
                      {location.provincies?.map((prov) => (
                        <option key={prov.id} value={prov.name}>
                          {prov.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="regencies">Kab/Kota</label>
                    <select name="regencies" id="regencies">
                      {location.regencies?.length != 0 &&
                        location.regencies?.map((regencie, i) => (
                          <option key={i} value={regencie.name}>
                            {regencie.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
