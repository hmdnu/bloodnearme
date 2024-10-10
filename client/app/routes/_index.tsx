import type { MetaFunction } from "@remix-run/node";
import { Nav, HospitalCard } from "../components/index";

export const meta: MetaFunction = () => {
  return [{ title: "Bloodnearme" }, { name: "description", content: "Welcome to Bloodnearme!" }];
};

export default function Index() {
  return (
    <>
      <Nav />
      <main className="base">
        <HospitalCard />
      </main>
    </>
  );
}
