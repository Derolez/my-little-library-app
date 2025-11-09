"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      {...(pending && { disabled: true })}
      className={`flex bg-blue-400 h-10 w-62 px-4 rounded-lg text-sm font-medium items-center text-white transition-colors hover:bg-blue-300 ${
        pending ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {pending ? "Adding..." : "Add Book"}
    </button>
  );
}