import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import miniLogo from "../../img/mini_logo.png";
import { useTheme } from "../../ThemeContext"; // Importando o hook

const GraficosDetalhados = () => {
  const { isDarkMode } = useTheme(); // Acessando o estado de isDarkMode
  const trendChartRef = useRef(null);
  const rootCauseChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const histogramChartRef = useRef(null);
  const effectivenessChartRef = useRef(null);

  useEffect(() => {
    const createChart = (ctx, type, data, options, chartRef) => {
      destroyChart(chartRef);
      chartRef.current = new Chart(ctx, {
        type: type,
        data: data,
        options: options,
      });
    };

    const destroyChart = (chartRef) => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };

    const initializeCharts = () => {
      const trendCtx = document.getElementById("trendChart")?.getContext("2d");
      const rootCauseCtx = document
        .getElementById("rootCauseChart")
        ?.getContext("2d");
      const pieCtx = document
        .getElementById("conformidadesChart")
        ?.getContext("2d");
      const severityCtx = document
        .getElementById("severityChart")
        ?.getContext("2d");
      const histogramCtx = document
        .getElementById("histogramChart")
        ?.getContext("2d");
      const effectivenessCtx = document
        .getElementById("effectivenessChart")
        ?.getContext("2d");

      if (trendCtx) {
        createChart(
          trendCtx,
          "line",
          {
            labels: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
            ],
            datasets: [
              {
                label: "Não Conformidades",
                data: [12, 19, 3, 5, 2, 3, 9, 12, 7, 5, 8, 10],
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: isDarkMode ? "#a7a7a7" : "black", // Cor das marcações no eixo Y
                },
              },
              x: {
                ticks: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor das marcações no eixo X
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          trendChartRef
        );
      }

      if (rootCauseCtx) {
        createChart(
          rootCauseCtx,
          "bar",
          {
            labels: [
              "Processo",
              "Treinamento",
              "Equipamento",
              "Pessoas",
              "Material",
            ],
            datasets: [
              {
                label: "Causa Raiz",
                data: [10, 15, 12, 8, 5],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: isDarkMode ? "#a7a7a7" : "black", // Cor das marcações no eixo Y
                },
              },
              x: {
                ticks: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor das marcações no eixo X
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          rootCauseChartRef
        );
      }

      if (pieCtx) {
        createChart(
          pieCtx,
          "pie",
          {
            labels: ["Em Aberto", "Pendente", "Concluídas"],
            datasets: [
              {
                label: "Conformidades Totais",
                data: [15, 5, 10],
                backgroundColor: [
                  "rgba(27, 73, 255, 0.8)",
                  "rgba(246, 157, 48, 0.8)",
                  "rgba(79, 193, 64, 0.8)",
                ],
                borderColor: [
                  "rgba(27, 73, 255, 1)",
                  "rgba(246, 157, 48, 1)",
                  "rgba(79, 193, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          pieChartRef
        );
      }

      if (severityCtx) {
        createChart(
          severityCtx,
          "doughnut",
          {
            labels: ["Baixo", "Médio", "Alto"],
            datasets: [
              {
                label: "Classificação por Grau de Severidade",
                data: [20, 10, 5],
                backgroundColor: [
                  "rgba(79, 193, 64, 0.8)",
                  "rgba(246, 157, 48, 0.8)",
                  "rgba(255, 0, 55, 0.8)",
                ],
                borderColor: [
                  "rgba(79, 193, 64, 1)",
                  "rgba(246, 157, 48, 1)",
                  "rgba(255, 0, 55, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          severityChartRef
        );
      }

      if (histogramCtx) {
        createChart(
          histogramCtx,
          "bar",
          {
            labels: ["Setor A", "Setor B", "Setor C", "Setor D"],
            datasets: [
              {
                label: "Não Conformidades",
                data: [8, 15, 6, 12],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: isDarkMode ? "#a7a7a7" : "black", // Cor das marcações no eixo Y
                },
              },
              x: {
                ticks: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor das marcações no eixo X
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          histogramChartRef
        );
      }

      if (effectivenessCtx) {
        createChart(
          effectivenessCtx,
          "doughnut",
          {
            labels: ["Eficazes", "Ineficazes"],
            datasets: [
              {
                label: "Eficácia das Ações Corretivas",
                data: [30, 10],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(255, 99, 132, 0.8)",
                ],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#b1aeae" : "black", // Cor da legenda
                },
              },
              tooltip: {
                titleColor: isDarkMode ? "#b1aeae" : "black", // Cor do título das tooltips
                bodyColor: isDarkMode ? "#b1aeae" : "black", // Cor do corpo das tooltips
              },
            },
          },
          effectivenessChartRef
        );
      }
    };

    const timeoutId = setTimeout(() => {
      initializeCharts();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      destroyChart(trendChartRef);
      destroyChart(rootCauseChartRef);
      destroyChart(pieChartRef);
      destroyChart(severityChartRef);
      destroyChart(histogramChartRef);
      destroyChart(effectivenessChartRef);
    };
  }, [isDarkMode]);

  const [personState, setPersonState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ao carregar o componente, tenta obter o usuário do localStorage
    const storedPerson = localStorage.getItem("person");

    if (storedPerson) {
      setPersonState(JSON.parse(storedPerson)); // Atualiza o estado com as informações do usuário
    }
    setIsLoading(false); // Finaliza o carregamento
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-[90px] mx-auto">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mt-[90px] mx-auto">
      <div className="flex flex-col gap-6 mt-16">
        <div className="mb-6 ">
          <div className="flex justify-between">
            <div>
              {/* Aparecer apenas em telas maiores que `sm` */}
              <div className="max-sm:hidden">
                {personState ? (
                  <p className="text-xl">
                    Seja Bem-vindo(a),{" "}
                    <b className="font-semibold">{personState.name}</b> ao
                    painel de controle das não conformidades.
                  </p>
                ) : (
                  <p className="text-xl">
                    Seja Bem-vindo(a) ao painel de controle das não
                    conformidades.
                  </p>
                )}
              </div>
              {/* Aparecer apenas em telas menores ou iguais a `sm` */}
              <div className="hidden max-sm:block ml-7">
                {personState ? (
                  <p className="text-lg">
                    Seja Bem-vindo(a),{" "}
                    <b className="font-semibold">{personState.name}</b>
                  </p>
                ) : (
                  <p>a</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 max-sm:hidden">
              <p className="mt-0 text-sm">Fundação Parreiras Horta, 2024 </p>
              <img src={miniLogo} alt="logo do FPH" className="w-8 h-auto" />
            </div>
          </div>
          <div className="border-b mt-2 border-[#bdbdbd] " />
        </div>
        <div className="grid max-xl:grid-cols-1 xl:grid-cols-3 gap-5 max-lg:gap-3 ml-3 mr-3">
          {/* Causa Raiz das Não Conformidades */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Causa Raiz das Não Conformidades
            </h2>
            <canvas id="rootCauseChart" className="w-full h-full"></canvas>
          </div>

          {/* Tendência das Não Conformidades */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Tendência das Não Conformidades
            </h2>
            <canvas id="trendChart" className="w-full h-full"></canvas>
          </div>

          {/* Eficácia das Ações Corretivas */}
          <div
            className="chart-container max-lg:hidden flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Eficácia das Ações Corretivas
            </h2>
            <canvas id="effectivenessChart" className="w-full h-full"></canvas>
          </div>

          {/* Classificação por Severidade */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Classificação por Severidade
            </h2>
            <canvas id="severityChart" className="w-full h-full"></canvas>
          </div>

          {/* Conformidades Totais */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Conformidades Totais
            </h2>
            <canvas id="conformidadesChart" className="w-full h-full"></canvas>
          </div>

          {/* Gráfico de Histogramas */}
          <div
            className="chart-container max-xl:hidden flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg max-sm:text-sm mt-2 font-medium">
              Gráfico de Histogramas
            </h2>
            <canvas id="histogramChart" className="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosDetalhados;
