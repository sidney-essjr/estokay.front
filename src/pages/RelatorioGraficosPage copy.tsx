import Title from "../components/common/Title";
import useRelatorioGraficoModel from "../components/relatorio/relatorio-grafico/relatorio-grafico.model";
import RelatorioGraficoViewForm from "../components/relatorio/relatorio-grafico/relatorio-grafico.view";
import { GetDistribuicao } from "../services/fetchBuscarDistribuicao";

export default function RelatoriosGraficosPage() {
  const getDistribuicao = new GetDistribuicao();
  const methods = useRelatorioGraficoModel({ getDistribuicao });
  return (
    <section className="m-auto max-w-[1000px]">
      <Title>
        <h1>Relatórios Graficos</h1>
      </Title>
      <RelatorioGraficoViewForm {...methods} />
    </section>
  );
}
