"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "./Button.css";

export default function Button() {
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      localStorage.setItem("audioFile", URL.createObjectURL(file));
      router.push("/cutter");
    }
  };

  return (
    <button className="button">
      <label htmlFor="audio-upload">Browse my files</label>
      <input
        type="file"
        id="audio-upload"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </button>
  );
}
