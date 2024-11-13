type GraficoViewProps = {
  contagemMeses: Record<string, number>;
  itensTotal: number;
  registrosPorCategoria: Record<string, number>;
  registrosPorMes: Record<string, number>;
};

export default function GraficoView({
  contagemMeses,
  itensTotal,
  registrosPorCategoria,
  registrosPorMes,
}: GraficoViewProps) {
  console.log(contagemMeses, itensTotal, registrosPorCategoria, registrosPorMes);
  return <section className="flex "></section>;
}
