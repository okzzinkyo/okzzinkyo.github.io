// Const로 정의할거면 엘리먼트 지우고 새로 만들어도 const로 정의가 되어있는게 있어서 이전 element에서 변한게 없음
// chart.js 도 document ready에 들어가야하는게 정상이지만 script src가 html 상으로 제일 마지막에 있어서 안넣었음.

  
  var ctx1 = document.getElementById("Chart_confirmed").getContext("2d");
  Chart_confirmed = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "전세계",
          data: [],
          borderColor: "rgba(75, 192, 192, 1)",
          yAxisID: 'y',
        },
        {
          label: "설정한 지역",
          data: [],
          borderColor: "rgba(255, 159, 64, 1)",
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxHeight: 1
          },
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    }
  });

  const ctx2 = document.getElementById("Chart_deaths").getContext("2d");
  Chart_deaths = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "설정한 지역",
          data: [],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxHeight: 1,
          },
        }
      }
    }
  });

  //선택한 나라의 회복자 추이
  var ctx3 = document.getElementById("Chart_recovered").getContext("2d");
  Chart_recovered = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "설정한 지역",
          data: [],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxHeight: 1
          },
        }
      }
    }
  });