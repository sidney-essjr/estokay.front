import { ReactNode } from "react";

export default function LayoutHomeLogado({ children }: { children: ReactNode }) {
  return (
    <section className="sm:p-5 sm:w-[calc(100vw-64px)] sm:h-[calc(100vh-128px)] sm:left-16 sm:top-0 p-2 top-20 w-screen h-[calc(100vh-208px)] absolute ">
      {children}
    </section>
  );
}
