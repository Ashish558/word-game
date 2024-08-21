import React from "react";

interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <p className="btnText">{text}</p>
    </button>
  );
};
export default Button;
