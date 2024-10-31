import { useState } from "react";
import { ItemDoacao } from "../../types/ItemDoacao";
import Modal from "../common/Modal";
import EstoqueForm from "./EstoqueForm";
import FormAtualizarItem from "./FormAtualizarItem";
import TabelaItensEstoque from "./TabelaItensEstoque";

export default function EstoqueContainer() {
  const [data, setData] = useState<ItemDoacao[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState<ItemDoacao | object>({});
  return (
    <section>
      <EstoqueForm setData={setData} />
      <TabelaItensEstoque
        itens={data}
        setUpdatedItem={setUpdatedItem}
        setIsOpen={setIsOpen}
        setItens={setData}
      />
      {isOpen && (
        <Modal title="Atualizar Item" openModal={setIsOpen}>
          <FormAtualizarItem item={updatedItem} />
        </Modal>
      )}
    </section>
  );
}
