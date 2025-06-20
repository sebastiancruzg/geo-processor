"use client";

import React, { useState } from "react";

interface FormData {
  lat: number;
  lng: number;
}

const PointForm = () => {
  const [formData, setFormData] = useState<FormData>({
    lat: 0,
    lng: 0,
  });

  const handleChange = (e: { target: { name: any; value: string } }) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    // You would typically send this data to an API or perform other actions
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-10 p-4 rounded shadow-md mx-auto mb-5"
    >
      <div className="border-r-2 pr-4">
        <label htmlFor="lat">Latitud:</label>
        <input
          type="number"
          min={-90}
          max={90}
          id="lat"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lng">Longitud:</label>
        <input
          type="number"
          min={-180}
          max={180}
          id="lng"
          name="lng"
          value={formData.lng}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PointForm;
