import { ReactNode } from "react";

type TitleProps = {
  className?: string;
  children: ReactNode;
};

export default function Title({ children, className }: TitleProps) {
  const style = className;
  return <div className={`${style} py-2 px-4 text-xl animeLeft text-logo-gray-color`}>{children}</div>;
}
