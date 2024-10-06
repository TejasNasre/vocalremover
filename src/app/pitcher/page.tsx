import React from "react";
import Button from "@/components/Button/Button";
import { IconLock } from "@tabler/icons-react";

function Home() {
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
              Audio Speed and Pitch Changer
            </h1>
            <p style={{ fontSize: "23px", margin: "0" }}>
              Changes pitch and tempo of the song by adjusting musical key and
              bpm sliders
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
            Free Online Pitch Shifter
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
              This app changes the song pitch and/or playback speed using one of
              the best pitch shifting algorithms. The musical key, scale, and
              bpm will be automatically detected.
            </p>
            <p>
              You can easily transpose music to a different key and change the
              tempo by adjusting the pitch shifter key and bpm sliders.
            </p>
          </div>
          <p style={{ fontSize: "35px", fontWeight: "500" }}>Features</p>
          <div
            style={{
              backgroundColor: "#1F1F28",
              borderLeft: "4px solid #665DC3",
              padding: "8px 30px",
              marginBottom: "20px",
              fontSize: "25px",
            }}
          >
            <ul>
              <li>Analyzes music and finds musical key, scale and bpm</li>
              <li>Changes audio pitch</li>
              <li>Speed up or slow down music playback speed</li>
            </ul>
          </div>
          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "25px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              <IconLock size={30} style={{ marginRight: "10px" }} />
              Privacy and Security Guaranteed
            </div>
            <div
              style={{
                backgroundColor: "#1F1F28",
                borderLeft: "4px solid #665DC3",
                padding: "8px 30px",
                fontSize: "25px",
              }}
            >
              This is serverless app. Your files does not leave your device
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
