import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useFetcher, useLocation } from "@remix-run/react";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

export default function ManageBloodStock({ bloodType, stock }: { bloodType: string; stock: number }) {
  const form = useForm({
    defaultValues: {
      "blood-stock": stock,
    },
  });

  const fetcher = useFetcher();
  const location = useLocation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Edit stok darah {bloodType}</DialogTitle>

          <FormProvider {...form}>
            <fetcher.Form action={location.pathname} method="POST">
              <FormField
                control={form.control}
                name="blood-stock"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="edit blood stock" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-5">
                Edit
              </Button>
            </fetcher.Form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
