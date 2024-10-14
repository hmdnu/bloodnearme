import { Label } from "@radix-ui/react-label";
import { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";

export const meta: MetaFunction = () => {
  return [{ title: "Register sebagai pasien" }];
};

export default function RegisterPatientPage() {
  const form = useForm();
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <section className="bg-red-900 grid place-content-center h-screen">
      <section className="bg-white p-5 rounded-md flex flex-col items-center">
        <Link to={"/"} className="heading-3">
          Bloodnearme
        </Link>

        <h1 className="heading-3 text-center mb-5">Register sebagai pasien</h1>

        <FormProvider {...form}>
          <Form method="POST" className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="nama" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="nama pengguna" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="No Hp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="no hp" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                  <FormControl>
                    <Input placeholder="password" type={`${viewPassword ? "text" : "password"}`} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm-password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="konfirmasi password"
                      type={`${viewPassword ? "text" : "password"}`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Label className="flex items-center gap-2 w-fit">
              <Checkbox id="view-password" onClick={() => setViewPassword((e) => !e)} />
              See password
            </Label>

            <Button className="bg-red-900 hover:bg-red-950 font-semibold" type="submit">
              Register
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
