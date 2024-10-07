"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../../contexts/fileContext";
import { useRouter } from "next/navigation";
import "./Button.css";

export default function Button() {
  const router = useRouter();
  const inputFile = useRef(null);
  const { setFileURL, setIsAudioLoaded } = useContext(FileContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setFileURL(objectURL);
      setIsAudioLoaded(false); // Reset the isAudioLoaded state
      router.push("/edit");
    }
  }, [file, setFileURL, setIsAudioLoaded, router]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <button className="button">
      <label htmlFor="audio-upload">Browse my files</label>
      <input
        type="file"
        id="audio-upload"
        accept="audio/*"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </button>
  );
}
