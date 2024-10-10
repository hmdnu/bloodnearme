import { ActionFunctionArgs } from "@remix-run/node";
import { MetaFunction, Form, redirect, useActionData, json } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authPatient, authHospital, authOrganizer } from "~/lib/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const email = String(body.get("email"));
  const password = String(body.get("password"));

  const isPatientValid = authPatient({ email, password });
  const isHospitalValid = authHospital({ email, password });
  const isOrganizerValid = authOrganizer({ email, password });

  if (!isPatientValid && !isHospitalValid && !isOrganizerValid) {
    return json({ message: "auth failed" });
  }

  return redirect("/");
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [viewPassword, setViewPassword] = useState(false);

  return (
    <section className="grid place-content-center h-screen bg-red-900">
      <section className="bg-white p-5 rounded-md">
        <h1 className="heading-3 text-center mb-5">Login</h1>
        <FormProvider {...form}>
          <Form method="POST" className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
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

            {/* error message */}
            <FormLabel className="text-red-500 font-semibold text-sm">{actionData?.message}</FormLabel>

            <Button className="bg-red-900 hover:bg-red-950 font-semibold" type="submit">
              Login
            </Button>

            <p className="text-center text-sm font-semibold">
              Belum punya akun?{" "}
              <a href="/register/role" className="text-neutral-600 hover:underline ">
                Register
              </a>
            </p>
          </Form>
        </FormProvider>
      </section>
    </section>
  );
}
