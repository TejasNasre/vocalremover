"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../contexts/fileContext";
import { useRouter } from "next/navigation";

export default function UploadAudio() {
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
    <div>
      <input
        type="file"
        ref={inputFile}
        onChange={handleFileChange}
        accept="audio/*"
      />
    </div>
  );
}
