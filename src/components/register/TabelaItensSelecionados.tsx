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
    <table>
      <thead>
        <tr>
          <td>COD.</td>
          <td>TIPO</td>
          <td>DESCRIÇÃO</td>
          <td>QUANTIDADE</td>
          <td>REMOVER</td>
        </tr>
      </thead>
      <tbody>
        {itens.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.tipo}</td>
            <td>{item.descricao.split(" ").pop()}</td>
            <td>{item.quantidade}</td>
            <td>
              <Button onClick={() => remover(item.id)}>Remover</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
