import React from "react";

const warningStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#333",
  padding: "2rem",
  zIndex: 10000,
  position: "fixed",
  top: 0,
  left: 0,
};

const textStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  maxWidth: "90vw",
  lineHeight: 1.5,
};

const emojiStyle = { fontSize: "3rem", marginBottom: "1rem" };

export default function MobileWarning() {
  return (
    <div style={warningStyle}>
      <div style={emojiStyle}>📱🚫</div>
      <div style={textStyle}>
        Please open the website in desktop mode.
        <br />
        The developer is working on responsiveness.
        <br />
        <span style={{ color: "#f76d6d" }}>Sorry for the inconvenience 🙏</span>
      </div>
    </div>
  );
}
