import { useState } from "react";
import { RelatorioDistribuicao } from "../../services/fetchBuscarDistribuicao";
import FormRelatorio from "./FormRelatorio";
import TabelaInformacaoRelatorio from "./TabelaInformacaoRelatorio";

export default function RelatorioContainer() {
  const [data, setData] = useState<RelatorioDistribuicao[]>([]);
  return (
    <section className="space-y-2">
      <FormRelatorio setData={setData} />
      {<TabelaInformacaoRelatorio data={data} />}
    </section>
  );
}
