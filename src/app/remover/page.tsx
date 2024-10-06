import React from "react";
import Button from "@/components/Button/Button";

function page() {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          color: "#EEEEEE",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#17171E",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "200px",
            borderBottom: "1px solid #2C2C36",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "25px",
              textTransform: "uppercase",
              color: "#D8D8E2",
              fontWeight: "bold",
            }}
          >
            <div>How it works</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#D8D8E2",
              justifyItems: "center",
              alignItems: "center",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            <h1 style={{ fontSize: "46px", margin: "0" }}>
              Vocal Remover and Isolation
            </h1>
            <p style={{ fontSize: "23px", margin: "0" }}>
              Separate voice from music out of a song free with powerful AI
              algorithms
            </p>
            <Button />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "#17171E",
            padding: "60px",
          }}
        >
          <p style={{ fontSize: "35px", fontWeight: "500" }}>
            Remove vocals from a song
          </p>
          <div
            style={{
              backgroundColor: "#1F1F28",
              borderLeft: "4px solid #665DC3",
              padding: "8px 30px",
              marginBottom: "20px",
              fontSize: "25px",
            }}
          >
            <p>
              This free online application will help remove vocals from a song
              by creating karaoke.
            </p>
            <p>
              Once you choose a song, artificial intelligence will separate the
              vocals from the instrumental ones. You will get two tracks - a
              karaoke version of your song (no vocals) and acapella version
              (isolated vocals).
            </p>
            <p>
              Despite the complexity and high cost of service, you can use it
              absolutely free. Processing usually takes about 10 seconds.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
