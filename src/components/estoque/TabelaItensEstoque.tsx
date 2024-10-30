import { Dispatch, SetStateAction } from "react";
import { ItemDoacao } from "../../types/ItemDoacao";
import Button from "../common/Button";

export default function TabelaItensEstoque({
  itens,
  setItens,
}: {
  itens: ItemDoacao[];
  setItens: Dispatch<SetStateAction<ItemDoacao[]>>;
}) {
  function remover(id: number) {
    const itensExibidos = itens.filter((item) => item.id !== id);
    setItens(itensExibidos);
  }

  return (
    <section className="w-full overflow-auto max-h-96">
      <table className="w-full min-w-[600px] p-2 h-12 justify-around border border-logo-gray-color">
        <thead>
          <tr className="w-full p-2 h-12 text-center border border-logo-gray-color font-bold text-logo-gray-color">
            <th scope="col" className="p-2 h-12 w-20 border border-logo-gray-color">
              EDITAR
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              COD.
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              CATEGORIA
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              DESCRIÇÃO
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              TAMANHO
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              MEDIDA
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              VALIDADE
            </th>
            <th scope="col" className="p-2 h-12 border border-logo-gray-color">
              QUANTIDADE
            </th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id}>
              <td className="p-2 h-12 border border-logo-gray-color">
                <Button className=" w-14 h-8" variant="none" onClick={() => remover(item.id)}>
                  Editar
                </Button>
              </td>
              <td className="p-2 text-center h-12 border border-logo-gray-color">{item.id}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.categoria}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.descricao}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.tamanho}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.medida}</td>
              <td className="p-2 text-center h-12 border border-logo-gray-color">{item.validade.toString()}</td>
              <td className="p-2 text-center h-12 border border-logo-gray-color">{item.quantidade}</td>
            </tr>
          ))}
          <tr className="font-bold text-logo-gray-color">
            <td colSpan={7} className="p-2 h-12 border border-logo-gray-color">
              TOTAL
            </td>
            <td className="text-center p-2 h-12 border border-logo-gray-color">{itens.length}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
