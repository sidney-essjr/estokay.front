type GraficoViewProps = {
  itensTotal: number;
  registrosPorCategoria: Map<string, number> | undefined;
  registrosPorMes: Record<string, number> | undefined;
  registrosPorUF?: Map<string, number> | undefined;
};

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryTheme,
} from "victory";

export default function GraficoView({
  itensTotal,
  registrosPorCategoria,
  registrosPorMes,
  registrosPorUF,
}: GraficoViewProps) {
  console.log(registrosPorMes);
  return (
    <section className="flex flex-wrap">
      <div >
        <VictoryChart theme={VictoryTheme.clean} domainPadding={20}>
          <VictoryAxis style={{ tickLabels: { fontSize: 10, padding: 5 } }} />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}`}
            style={{ tickLabels: { fontSize: 10, padding: 5 } }}
          />
          <VictoryLabel
            text="Registros por mês"
            x={130} // Posicionamento horizontal do título (ajuste conforme necessário)
            y={30} // Posicionamento vertical do título (ajuste conforme necessário)
            textAnchor="middle" // Centraliza o título
            style={{ fontSize: 20, fill: "#a6a6a6", fontFamily: "roboto" }} // Estilos do título
          />
          <VictoryBar
            data={
              registrosPorMes
                ? Object.entries(registrosPorMes).map(([key, value]) => ({
                    meses: key,
                    quantidade: value,
                  }))
                : []
            }
            x="meses"
            y="quantidade"
            style={{
              data: { fill: "#fb3b2e", width: 30 },
              labels: { fontSize: 10, fill: "#000" },
            }}
            labels={({ datum }) => `${datum.quantidade}`}
          />
        </VictoryChart>
      </div>
      <div className="w-[300px] h-[300px]">
        <VictoryPie
          data={
            registrosPorCategoria
              ? Array.from(registrosPorCategoria, ([key, value]) => ({ x: key, y: value }))
              : []
          }
          x="x"
          y="y"
          innerRadius={100} // Cria um gráfico de pizza (faça o valor 0 para um gráfico de pizza completo)
          style={{
            data: {
              fillOpacity: 0.8, // Opacidade para dar um efeito moderno
              stroke: "#fff", // Cor da borda
              strokeWidth: 2, // Espessura da borda
            },
            labels: {
              fontSize: 16, // Tamanho da fonte das labels
              fill: '"#a6a6a6',
              fontFamily: "roboto", // Cor das labels
            },
          }}
          colorScale={[
            "#fb3b2e",
            "#a6a6a6",
            "#8c8c8c",
            "#f74d39",
            "#bfbfbf",
            "#e0d9d0",
            "#ffffff",
            "#d13f2a",
          ]} // Cores personalizadas
          labelRadius={130} // Define o espaço para as labels
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
        />
      </div>
    </section>
  );
}
