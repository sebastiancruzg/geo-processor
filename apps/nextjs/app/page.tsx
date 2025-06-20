"use client";

import dynamic from "next/dynamic";
import PointForm from "./components/PointForm";
import { useEffect, useState } from "react";

interface Point {
  lat: number;
  lng: number;
}

interface Bound {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface GeoInfo {
  centroid: Point;
  bounds: Bound;
}

const Map = dynamic(() => import("@/app/components/Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function Page() {
  const [points, setPoints] = useState<Point[]>([]);

  const [geoInfo, setGeoInfo] = useState<GeoInfo>();

  const handleAddPoint = (newPoint: Point) => {
    setPoints((prev) => [...prev, newPoint]);
  };

  const handleRemovePoint = (index: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const response = processPoints(points);
    setGeoInfo(response);
    console.log("Processed points:", response);
  }, [points]);

  const processPoints = async (points: Point[]) => {
    try {
      const response = await fetch(
        process.env.NESTGEOSERVICE || "http://locahost:8011/geo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(points),
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error processing points:", error);
    }
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
