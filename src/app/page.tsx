import React from "react";
import Link from "next/link";
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
            <div>
              <Link
                href={"https://vocalremover.org/joiner"}
                style={{
                  textDecoration: "none",
                  color: "#D8D8E2",
                  fontWeight: "bold",
                }}
              >
                Joiner
              </Link>
            </div>
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
            <h1 style={{ fontSize: "46px", margin: "0" }}>Audio Cutter</h1>
            <p style={{ fontSize: "23px", margin: "0" }}>
              Free editor to trim and cut any audio file online
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
            How to cut audio
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
              This app can be used to trim and/or cut audio tracks, remove an
              audio fragments. Fade in and fade out your music easily to make
              the audio harmoniously.
            </p>
            <p>
              It fast and easy to use. You can save the audio file in any format
              (codec parameters are configured)
            </p>
            <p>
              It works directly in the browser, no needs to install any
              software, is available for mobile devices.
            </p>
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
