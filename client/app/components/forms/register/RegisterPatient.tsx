import { Form } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function RegisterPatient({
  setRegisterRole,
}: {
  setRegisterRole: React.Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm();
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <section className="bg-white p-5 rounded-md">
      <button onClick={() => setRegisterRole((e: boolean) => !e)} className="mb-3 text-sm text-red-900 hover:underline">
        back
      </button>

      <section>
        <h1 className="heading-3 text-center mb-3">Register sebagai pasien</h1>
        <FormProvider {...form}>
          <Form method="POST" className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type={`${viewPassword ? "text" : "password"}`} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Label className="flex items-center gap-2 w-fit">
              <Checkbox id="view-password" onClick={() => setViewPassword((e) => !e)} />
              See password
            </Label>

            <Button className="bg-red-900 hover:bg-red-950 font-semibold" type="submit">
              Login
            </Button>

            <p className="text-center text-sm font-semibold">
              Sudah punya akun?{" "}
              <a href="/login" className="text-neutral-600 hover:underline ">
                Login
              </a>
            </p>
          </Form>
        </FormProvider>
      </section>
    </section>
  );
}
