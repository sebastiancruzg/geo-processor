"use client";

import dynamic from "next/dynamic";
import PointForm from "./components/PointForm";
import { useState } from "react";

interface Point {
  lat: number;
  lng: number;
}

const Map = dynamic(() => import("@/app/components/Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function Page() {
  const [points, setPoints] = useState<Point[]>([
    { lat: 40.7128, lng: -74.006 },
  ]);

  const handleAddPoint = (newPoint: Point) => {
    setPoints((prev) => [...prev, newPoint]);
  };

  const handleRemovePoint = (index: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto my-5 w-[98%] h-[480px]">
      <PointForm
        onAddPoint={handleAddPoint}
        points={points}
        onRemovePoint={handleRemovePoint}
      />
      <Map points={points} />
    </div>
  );
}
