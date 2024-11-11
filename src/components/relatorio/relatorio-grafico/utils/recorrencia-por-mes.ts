const calcRecorrenciaPorMes = (datas: Date[]) => {
  const dataInicio = new Date(Math.min(...datas.map((data) => new Date(data).getTime())));
  const dataFim = new Date(Math.max(...datas.map((data) => new Date(data).getTime())));

  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const contagemMeses: Record<string, number> = {};
  let anoInicial = dataInicio.getFullYear();
  let mesInicial = dataInicio.getMonth();

  while (
    anoInicial < dataFim.getFullYear() ||
    (anoInicial === dataFim.getFullYear() && mesInicial <= dataFim.getMonth())
  ) {
    const nomeMes = nomesMeses[mesInicial];

    contagemMeses[nomeMes] = (contagemMeses[nomeMes] || 0) + 1;
    mesInicial++;

    if (mesInicial > 11) {
      mesInicial = 0;
      anoInicial++;
    }
  }
  return contagemMeses;
};

export default calcRecorrenciaPorMes;
