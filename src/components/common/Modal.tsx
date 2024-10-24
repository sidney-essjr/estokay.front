import { ReactNode } from "react";
import Button from "./Button";
import Title from "./Title";

export default function Modal({
  children,
  openModal,
}: {
  children: ReactNode;
  openModal: (open: boolean) => void;
}) {
  return (
    <section className="absolute w-screen sm:w-[calc(100vw-79px)] h-[calc(100vh-228px)] sm:h-[calc(100vh-130px)] left-0 top-0 flex justify-center">
      <div className="absolute w-full h-full left-0 top-0 bg-black z-10 opacity-50"></div>
      <div className="bg-white flex flex-col opacity-100 w-[95%] sm:w-5/6 z-20 absolute top-8 max-w-[900px] rounded-lg p-3">
        <div className="flex justify-between items-center">
          <Title className="flex-1"><h1>Cadastro de Doador</h1></Title>
          <Button className="opacity-100 w-auto" type="button" onClick={() => openModal(false)}>
            Fechar
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
