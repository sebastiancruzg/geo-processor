"use client";

import dynamic from "next/dynamic";
import PointForm from "./components/PointForm";

const Map = dynamic(() => import("@/app/components/Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <PointForm />
        <Map posix={[4.79029, -75.69003]} />
      </div>
    </>
  );
}
