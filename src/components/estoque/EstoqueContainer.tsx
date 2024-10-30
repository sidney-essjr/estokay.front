import { useState } from "react";
import { ItemDoacao } from "../../types/ItemDoacao";
import EstoqueForm from "./EstoqueForm";
import TabelaItensEstoque from "./TabelaItensEstoque";

export default function EstoqueContainer() {
  const [data, setData] = useState<ItemDoacao[]>([]);
  return (
    <section>
      <EstoqueForm setData={setData} />
      <TabelaItensEstoque itens={data} setItens={setData} />
    </section>
  );
}
