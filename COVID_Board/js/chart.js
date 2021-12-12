$(window).ready(function(){

  //localStorage에 넣은 정보 추출
  var selected_data = JSON.parse(localStorage.getItem("country"));

  var selected_1=selected_data[0]
  var selected_2=selected_data[1]
  var selected_3=selected_data[2]
  var selected_4=selected_data[3]

  //선택한 나라의 확진자 추이
  const ctx1 = document.getElementById("Chart_confirmed").getContext("2d");
  Chart_confirmed = new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["08-Dec", "09-Dec", "10-Dec", "11-Dec"],
      datasets: [
        { 
          data:[50000, 40000, 250000,600000],
          label: "전세계",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "설정한 지역",
          data:[selected_1.Confirmed,selected_2.Confirmed,selected_3.Confirmed,selected_4.Confirmed],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
  });
  //선택한 나라의 사망자 추이
  const ctx2 = document.getElementById("Chart_deaths").getContext("2d");
  Chart_deaths = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["08-Dec", "09-Dec", "10-Dec", "11-Dec"],
      datasets: [
        {
          label: "설정한 지역",
          data:[selected_1.Deaths,selected_2.Deaths,selected_3.Deaths,selected_4.Deaths],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
  });

  //선택한 나라의 회복자 추이
  const ctx = document.getElementById("Chart_recovered").getContext("2d");
  Chart_recovered = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["08-Dec", "09-Dec", "10-Dec", "11-Dec"],
      datasets: [
        {
          label: "설정한 지역",
          data:[selected_1.Recovered,selected_2.Recovered,selected_3.Recovered,selected_4.Recovered],
          borderColor: "rgba(255, 159, 64, 1)",
        },
      ],
    },
  });
})