import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import miniLogo from "../../assets/icons/mini_logo.png";

const GraficosDetalhados = () => {
  const trendChartRef = useRef(null);
  const rootCauseChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const histogramChartRef = useRef(null);
  const effectivenessChartRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

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
            scales: { y: { beginAtZero: true } },
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
            scales: { y: { beginAtZero: true } },
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
            scales: { y: { beginAtZero: true } },
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
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6 mt-16">
        <div className="mb-6 ">
          <div className="flex justify-between">
            <p className="text-xl">
              Seja Bem vindo(a) <b className="font-semibold">{user.name}</b> ao
              painel de controle das não conformidades.
            </p>
            <div className="flex items-center gap-2">
              <p className="mt-0 text-sm">Fundação Parreiras Horta, 2024 </p>
              <img src={miniLogo} alt="logo do FPH" className="w-8 h-auto" />
            </div>
          </div>
          <div className="border-b mt-2 border-[#bdbdbd] " />
        </div>
        <div className="grid max-xl:grid-cols-2 xl:grid-cols-3 gap-5 max-lg:gap-2 ml-3">
          {/* Causa Raiz das Não Conformidades */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title  max-lg:text-sm  text-lg mt-2 font-medium">
              Causa Raiz das Não Conformidades
            </h2>
            <canvas
              id="rootCauseChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>

          {/* Tendência das Não Conformidades */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title max-xl:text-base max-lg:text-sm xl:text-lg mt-2 mb-1 font-medium">
              Tendência das Não Conformidades
            </h2>
            <canvas
              id="trendChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>

          {/* Eficácia das Ações Corretivas */}
          <div
            className="chart-container max-lg:hidden flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title max-xl:text-base text-lg mt-2 mb-1 font-medium">
              Eficácia das Ações Corretivas
            </h2>
            <canvas
              id="effectivenessChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>

          {/* Classificação por Severidade */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title max-xl:text-base max-lg:text-sm  text-lg mt-2 mb-1 font-medium">
              Classificação por Severidade
            </h2>
            <canvas
              id="severityChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>

          {/* Conformidades Totais */}
          <div
            className="chart-container flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title max-xl:text-base max-lg:text-sm  text-lg mt-2 mb-1 font-medium">
              Conformidades Totais
            </h2>
            <canvas
              id="conformidadesChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>

          {/* Gráfico de Histogramas */}
          <div
            className="chart-container flex max-xl:hidden flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            style={{ height: "300px" }}
          >
            <h2 className="chart-title text-lg mt-2 mb-1 font-medium">
              Gráfico de Histogramas
            </h2>
            <canvas
              id="histogramChart"
              style={{ height: "100%", width: "100%" }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosDetalhados;
