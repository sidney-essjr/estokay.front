import Title from "../components/common/Title";
import RelatorioContainer from "../components/relatorio/RelatorioContainer";

export default function RelatoriosPage() {
  return (
    <section className="m-auto max-w-[1000px]">
      <Title>
        <h1>Relatórios</h1>
      </Title>
      <RelatorioContainer />
    </section>
  );
}
