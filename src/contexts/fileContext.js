"use client";

import React, { createContext, useState } from "react";

export const FileContext = createContext({
  fileURL: "",
  setFileURL: () => {},
  isAudioLoaded: false,
  setIsAudioLoaded: () => {},
});

export default function FileProvider({ children }) {
  const [fileURL, setFileURL] = useState("");
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  return (
    <FileContext.Provider
      value={{ fileURL, setFileURL, isAudioLoaded, setIsAudioLoaded }}
    >
      {children}
    </FileContext.Provider>
  );
}
