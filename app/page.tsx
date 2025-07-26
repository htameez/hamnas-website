import React from "react";
import ContentController from "./ContentController";

export default function Home() {
  return (
      <div style={{ height: "500vh", backgroundColor: "#000" }}> {/* Increased height for more scrolling */}
        <ContentController />
      </div>
  );
}
