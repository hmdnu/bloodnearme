import { Input } from "~/components/ui/input";
import { Form } from "@remix-run/react";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Search() {
  const form = useForm();

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
                <DialogTitle>ini Modal</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
