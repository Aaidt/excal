"use client";

import { ReactNode } from "react";

interface ButtonProps {
  text: string,
  size: "md" | "lg",
  onClick?: () => void,
  color: "white" | "black"
}

const sizeStyles = {
  "md": "px-2 py-1",
  "lg": "px-3 py-1"
}

const colorStyles = {
  "white": "bg-white hover:bg-white/70 text-white",
  "black": "bg-black hover:bg-black/70 text-white"
}

const fixedStyles = "rounded-lg cursor-pointer"

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${sizeStyles[props.size]} ${fixedStyles} ${colorStyles[props.color]}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
