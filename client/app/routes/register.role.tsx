import { Link, MetaFunction } from "@remix-run/react";
import { ROLES } from "~/constant";

export const meta: MetaFunction = () => {
  return [{ title: "Register" }];
};

export default function RegisterPage() {
  return (
    <section className="grid place-content-center h-screen bg-red-900">
      <div className="bg-white p-5 rounded-md flex flex-col items-center">
        <Link to={"/"} className="heading-3">
          Bloodnearme
        </Link>

        <h1 className="text-center heading-4 mb-5">Register sebagai apa?</h1>

        <div className="flex flex-col gap-3 justify-center mb-5">
          {ROLES.map((role) => (
            <a key={role.role} className="bg-red-900 text-center p-2 rounded-md text-white heading-4" href={role.href}>
              {role.role}
            </a>
          ))}
        </div>

        <p className="text-center text-sm font-semibold">
          Sudah punya akun?{" "}
          <a href="/login" className="text-neutral-600 hover:underline ">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
