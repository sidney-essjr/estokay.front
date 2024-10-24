import { useState } from "react";
import { useQueries } from "react-query";
import { getLerDoadores } from "../../data/fetchLerDoadores";
import Modal from "../common/Modal";
import FormDoacao from "./FormDoacao";
import FormDoador from "./FormDoador";
import Title from "../common/Title";

export default function DoacaoContainer() {
  const queries = useQueries([{ queryKey: ["doador"], queryFn: getLerDoadores }]);
  const [doadorQuery] = queries;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="m-auto max-w-[1200px]">
      <Title><h1>Cadastro de Doação</h1></Title>
      <FormDoacao query={doadorQuery} openModal={setIsOpen}/>
      {isOpen && (
        <Modal openModal={setIsOpen}>
          <FormDoador />
        </Modal>
      )}
    </section>
  );
}