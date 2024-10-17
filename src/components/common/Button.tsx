import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "default" | "success" | "attention" | "none";
};

export default function Button({ variant = "default", children, ...rest }: ButtonProps) {
  let bgStyle = "";

  switch (variant) {
    case "success":
      bgStyle = "bg-success-color";
      break;
    case "attention":
      bgStyle = "bg-attention-color";
      break;
    case "none":
      bgStyle = "bg-text-color";
      break;
    default:
      bgStyle = "bg-detail-color";
      break;
  }

  return (
    <button
      className={`px-6 py-2 rounded-sm text-white font-bold flex items-center w-3/5 m-auto justify-center h-10 ${bgStyle}`}
      {...rest}
    >
      {children}
    </button>
  );
}
