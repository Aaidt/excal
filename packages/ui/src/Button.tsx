"use client";

interface ButtonProps {
  text: string,
  size: "md" | "lg",
  onClick?: () => void,
  color: "white" | "black"
}

const sizeClass: Record<ButtonProps["size"], string> = {
  "md": "px-2 py-1",
  "lg": "px-3 py-1"
}

const colorClass: Record<ButtonProps["color"], string> = {
  "white": "bg-white hover:bg-white/70 text-black",
  "black": "bg-black hover:bg-black/90 text-white"
}

export const Button = (props: ButtonProps) => {

  return (
    <button
      className={`rounded-lg cursor-pointer ${sizeClass[props.size]} ${colorClass[props.color]}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
