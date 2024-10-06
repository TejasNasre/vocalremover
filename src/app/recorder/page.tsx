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
              flexDirection: "column",
              color: "#D8D8E2",
              justifyItems: "center",
              alignItems: "center",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            <h1 style={{ fontSize: "46px", margin: "0" }}>Access Denied</h1>
            <p style={{ fontSize: "23px", margin: "0", textAlign: "center" }}>
              Please allow browser to access your microphone. You can do this in
              browser settings or in the address bar.
            </p>
            <Button />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
