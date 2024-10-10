import { MetaFunction } from "@remix-run/react";
import { CommunityCard, Nav } from "~/components";

export const meta: MetaFunction = () => {
  return [{ title: "Community" }];
};

export default function Community() {
  return (
    <>
      <Nav />
      <section className="base grid place-content-center">
        <CommunityCard />
      </section>
    </>
  );
}
