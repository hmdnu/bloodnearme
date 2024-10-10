import type { MetaFunction } from "@remix-run/node";
import { Nav, HospitalCard } from "../components/index";

export const meta: MetaFunction = () => {
  return [{ title: "Sidora" }, { name: "description", content: "Welcome to Remix!" }];
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
