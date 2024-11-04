import { memo } from "react";
import { RelatorioDistribuicao } from "../../services/fetchBuscarDistribuicao";

const TabelaInformacaoRelatorio = memo(({ data }: { data: RelatorioDistribuicao[] }) => {
  return <section className="w-full overflow-auto max-h-96"></section>;
});

export default TabelaInformacaoRelatorio;
