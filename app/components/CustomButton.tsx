import React from "react";
import "../globals.css";

interface CustomButtonProps {
  text: string;
  onClick?: () => void; // optional function, adjust to required if needed
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundImage: 'url("/images/button.png")',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "200px",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontFamily: "DidotBoldItalic",
        color: "#454525",
        fontSize: "1rem",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
};

export default CustomButton;