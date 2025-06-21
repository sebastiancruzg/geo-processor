"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GeoInfo, Point } from "./interfaces";
import { PointForm } from "./components/PointForm";

const Map = dynamic(() => import("@/app/components/Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const initialGeoInfo: GeoInfo = {
  centroid: { lat: 0, lng: 0 },
  bounds: { north: 0, south: 0, east: 0, west: 0 },
};

export default function Page() {
  const [points, setPoints] = useState<Point[]>([]);
  const [geoInfo, setGeoInfo] = useState<GeoInfo>(initialGeoInfo);

  const handleAddPoint = (newPoint: Point) => {
    setPoints((prev) => [...prev, newPoint]);
  };

  const handleRemovePoint = (index: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (points.length === 0) {
      setGeoInfo(initialGeoInfo);
      return;
    }

    const fetchGeoInfo = async () => {
      try {
        const response = await processPoints(points);
        setGeoInfo(response);
      } catch (error) {
        console.error("Error fetching geo info:", error);
      }
    };

    fetchGeoInfo();
  }, [points]);

  const processPoints = async (points: Point[]): Promise<GeoInfo> => {
    const apiUrl =
      process.env.NEXT_PUBLIC_NESTGEOSERVICE || "http://localhost:8011/geo";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return (
    <div className="mx-auto my-5 w-[98%] h-[480px]">
      <PointForm
        onAddPoint={handleAddPoint}
        points={points}
        onRemovePoint={handleRemovePoint}
      />
      <Map geoInfo={geoInfo} />
    </div>
  );
}
