"use client";

import { FormEvent, useState } from "react";

interface PointFormProps {
  points: { lat: number; lng: number }[];
  onAddPoint: (point: { lat: number; lng: number }) => void;
  onRemovePoint: (index: number) => void;
}

const PointForm = ({ points, onAddPoint, onRemovePoint }: PointFormProps) => {
  const [currentPoint, setCurrentPoint] = useState({
    lat: "",
    lng: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPoint = {
      lat: parseFloat(currentPoint.lat),
      lng: parseFloat(currentPoint.lng),
    };

    if (!isNaN(newPoint.lat) && !isNaN(newPoint.lng)) {
      onAddPoint(newPoint);
      setCurrentPoint({ lat: "", lng: "" }); // Reset form
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPoint((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="lat" className="block mb-1 font-semibold">
              Latitude
            </label>
            <input
              type="number"
              id="lat"
              name="lat"
              value={currentPoint.lat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 40.7128"
              min="-90"
              max="90"
              step="0.000001"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="lng" className="block mb-1 font-semibold">
              Longitude
            </label>
            <input
              type="number"
              id="lng"
              name="lng"
              value={currentPoint.lng}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. -74.0060"
              min="-180"
              max="180"
              step="0.000001"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
        >
          Add Point
        </button>
      </form>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Saved Points:</h3>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-gray-50 border-2  rounded"
            >
              <span>
                {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
              </span>
              <button
                onClick={() => onRemovePoint(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PointForm;
