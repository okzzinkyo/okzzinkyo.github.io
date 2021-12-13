  //선택한 나라의 확진자 추이
  const ctx1 = document.getElementById("Chart_confirmed").getContext("2d");
  const Chart_confirmed = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { 
          label: "전세계",
          data:[],
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "설정한 지역",
          data:[],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels:{
            boxHeight: 1
          },
        }
      }
    }
  });
  
  //선택한 나라의 사망자 추이
  const ctx2 = document.getElementById("Chart_deaths").getContext("2d");
  const Chart_deaths = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "설정한 지역",
          data:[],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels:{
            boxHeight: 1,
          },
        }
      }
    }
  });

  //선택한 나라의 회복자 추이
  const ctx = document.getElementById("Chart_recovered").getContext("2d");
  const Chart_recovered = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "설정한 지역",
          data:[],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels:{
            boxHeight: 1
          },
        }
      }
    }
  });
