import { Input } from "~/components/ui/input";
import { Form, useFetcher } from "@remix-run/react";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Search() {
  const form = useForm();
  const fetcher = useFetcher();

  return (
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

          <DialogContent className="max-sm:w-[90%] rounded-md">
            <DialogHeader>
              <DialogTitle className="mb-3">Filter</DialogTitle>
              <fetcher.Form action="/" method="POST" className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label className="heading-4" htmlFor="provinces">
                    Provinsi
                  </label>

                  <select name="provinces" id="provinces">
                    <option value="jawa timur">Jawa timur</option>
                    <option value="jawa tengah">Jawa tengah</option>
                    <option value="jawa barat">Jawa barat</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="heading-4" htmlFor="regencies">
                    Kab/Kota
                  </label>
                  <select name="regencies" id="regencies">
                    <option value="kab pasuruan">Kab. Pasuruan</option>
                    <option value="surabaya">Surabaya</option>
                    <option value="malang">Malang</option>
                  </select>
                </div>

                <Button type="submit">Set filter</Button>
              </fetcher.Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
