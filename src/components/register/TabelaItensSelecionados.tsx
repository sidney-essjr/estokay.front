import Button from "../common/Button";
import { ItemDistribuicao } from "./DistribuicaoContainer";

export default function TabelaItensSelecionados({
  itens,
  setItens,
}: {
  itens: ItemDistribuicao[];
  setItens: (itens: ItemDistribuicao[]) => void;
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
            <td className="p-2 h-12 border border-logo-gray-color">COD.</td>
            <td className="p-2 h-12 border border-logo-gray-color">TIPO</td>
            <td className="p-2 h-12 border border-logo-gray-color">DESCRIÇÃO</td>
            <td className="p-2 h-12 border border-logo-gray-color">QUANTIDADE</td>
            <td className="p-2 h-12 border border-logo-gray-color">REMOVER</td>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id}>
              <td className="p-2 h-12 border border-logo-gray-color">{item.id}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.tipo}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.descricao.split(" ").pop()}</td>
              <td className="p-2 h-12 border border-logo-gray-color">{item.quantidade}</td>
              <td className="p-2 h-12 border border-logo-gray-color">
                <Button className="w-auto h-8" onClick={() => remover(item.id)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
