import { ReactNode } from "react";

export default function ItemCadastro({ icon, desc }: { icon: ReactNode; desc: string }) {
  return (
    <div className="rounded-lg min-w-[230px] flex flex-row border-4 border-logo-gray-color justify-center items-center gap-8 p-4 md:flex-col">
      <div>{icon}</div>
      <h2 className="text-3xl text-logo-gray-color">{desc}</h2>
    </div>
  );
}
