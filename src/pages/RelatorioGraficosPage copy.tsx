import Title from "../components/common/Title";
import RelatorioGraficoViewForm from "../components/relatorio/relatorio-grafico/relatorio-grafico.view";

export default function RelatoriosGraficosPage() {
  return (
    <section className="m-auto max-w-[1000px]">
      <Title>
        <h1>Relatórios Graficos</h1>
      </Title>
      <RelatorioGraficoViewForm />
    </section>
  );
}
