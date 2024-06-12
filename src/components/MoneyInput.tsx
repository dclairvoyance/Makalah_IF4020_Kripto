"use client";

import { ChangeEvent, FocusEvent, useState } from "react";

const MoneyInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "" || !isNaN(Number(rawValue))) {
      const formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(rawValue));
      setValue(formattedValue);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(rawValue));
    setValue(formattedValue);
  };

  return (
    <input
      className="block w-full h-full text-end px-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default MoneyInput;
