$(window).ready(function(){

  //localStorage에 넣은 정보 추출
  var total_data = JSON.parse(localStorage.getItem("total"));
  var selected_data = JSON.parse(localStorage.getItem("country"));

  if(selected_data == null){
    alert("새로고침 해주세요.")
    return false;
  } else if (total_data == null){
    alert("새로고침 해주세요.")
    return false;
  }

  var selected_1=selected_data[3];
  var selected_2=selected_data[2];
  var selected_3=selected_data[1];
  var selected_4=selected_data[0];

  // 차트 x축 labels
  date_arr = [];
  for (let i=3; i>=0; i--){
    function date_labels (x){
      var monthNames = ["Jan", "Feb", "Mar", "Apr","May", "Jun","Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
      var date = selected_data[x].Date
      var month = date.substring(5,7);
      var day = date.substring(8,10);
      return day+"-"+monthNames[parseInt(month-1)]
    };
    date_arr.push(date_labels(i));  
  }

  //선택한 나라의 확진자 추이
  const ctx1 = document.getElementById("Chart_confirmed").getContext("2d");
  Chart_confirmed = new Chart(ctx1, {
    type: "line",
    data: {
      labels: date_arr,
      datasets: [
        { 
          label: "전세계",
          data:total_data,
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "설정한 지역",
          data:[selected_1.Confirmed,selected_2.Confirmed,selected_3.Confirmed,selected_4.Confirmed],
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
  Chart_deaths = new Chart(ctx2, {
    type: "line",
    data: {
      labels: date_arr,
      datasets: [
        {
          label: "설정한 지역",
          data:[selected_1.Deaths,selected_2.Deaths,selected_3.Deaths,selected_4.Deaths],
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
  Chart_recovered = new Chart(ctx, {
    type: "line",
    data: {
      labels: date_arr,
      datasets: [
        {
          label: "설정한 지역",
          data:[selected_1.Recovered,selected_2.Recovered,selected_3.Recovered,selected_4.Recovered],
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
})