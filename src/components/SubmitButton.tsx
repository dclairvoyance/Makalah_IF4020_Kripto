"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-[40%] bg-indigo-500 text-white rounded-sm h-full text-md"
    >
      {pending ? "Loading..." : "Donate"}
    </button>
  );
}
