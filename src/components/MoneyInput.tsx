"use client";

import { ChangeEvent, FocusEvent, useState } from "react";

const MoneyInput = () => {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    if (inputValue === "" || !isNaN(Number(inputValue))) {
      const formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(inputValue));
      setValue(formattedValue);
      setRawValue(Number(inputValue));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(inputValue));
    setValue(formattedValue);
    setRawValue(Number(inputValue));
  };

  return (
    <>
      <input
        className="block w-full h-full text-end px-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        id="displayAmount"
        name="displayAmount"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input type="hidden" id="amount" name="amount" value={rawValue} />
    </>
  );
};

export default MoneyInput;
