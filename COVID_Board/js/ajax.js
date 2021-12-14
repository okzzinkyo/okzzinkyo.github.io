
  // 전세계 코로나 정보 호출
  $.ajax({
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0
  }).done(function (response) {
    var TotalConfirmed = response.Global.TotalConfirmed;
    var NewConfirmed = response.Global.NewConfirmed;
    var TotalDeaths = response.Global.TotalDeaths;
    var NewDeaths = response.Global.NewDeaths;
    var TotalRecovered = response.Global.TotalRecovered;
    var NewRecovered = response.Global.NewRecovered;

    // 전세계 확진자 수
    $(".number[data-info='Confirmed']").append(
      TotalConfirmed.toLocaleString('en') + "명"
    );
    $(".New[data-info='Confirmed']").append(
      NewConfirmed.toLocaleString('en')
    );

    // 전세계 사망자 수
    $(".number[data-info='Deaths']").append(
      TotalDeaths.toLocaleString('en') + "명"
    );
    $(".New[data-info='Deaths']").append(
      NewDeaths.toLocaleString('en')
    );

    // 전세계 회복자 수
    $(".number[data-info='Recovered']").append(
      TotalRecovered.toLocaleString('en') + "명"
    );
    $(".New[data-info='Recovered']").append(
      NewRecovered.toLocaleString('en')
    );

    // 수치 증가, 동결 표시
    var Confirmed_status =  $(".New[data-info='Confirmed']>.status")
    var Deaths_status =  $(".New[data-info='Deaths']>.status")
    var Recovered_status =  $(".New[data-info='Recovered']>.status")
    
    if(NewConfirmed > 0){
      Confirmed_status.text('▲');
    } else if(NewConfirmed == 0){
      Confirmed_status.text('-');
    }

    if(NewDeaths > 0){
      Deaths_status.text('▲');
    } else if(NewDeaths == 0){
      Deaths_status.text('-');
    }

    if(NewRecovered > 0){
      Recovered_status.text('▲');
    } else if(NewRecovered == 0){
      Recovered_status.text('-');
    }

    // 국가 설정 박스 option 목록 생성
    for(var i=0; i<response.Countries.length; i++){
      var data = response.Countries[i].Country
      console.log(data)
      if(data != "Saint Vincent and Grenadines"){
        $("#countries").append("<option value='"+data+"'>"+data+"</option>")        
      }
    }

  });
  
  // 차트 datasets - 전세계 확진자
  var chart_data1 = Chart_confirmed.data.datasets[0].data;
  // 차트 datasets - 선택된 국가 확진자
  var chart_data1_1 = Chart_confirmed.data.datasets[1].data;
  // 차트 datasets - 선택된 국가 사망자
  var chart_data2 = Chart_deaths.data.datasets[0].data;
  // 차트 datasets - 선택된 국가 회복자
  var chart_data3 = Chart_recovered.data.datasets[0].data;

  //최근 4일 전세계 COVID19 확진자수 차트에 반영
  $.ajax({
    "url": "https://corona.lmao.ninja/v2/historical/all",
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {
  // 날짜 별 확진자 수
   var Case = response.cases
  //  객체(날짜:확진자 수) 중 value(확진자 수)만
   var CaseArr = Object.values(Case);
  //  최근 정보 4개만 chart_data1에 담기
   for(var i=1; i<5; i++){
     var info_total = CaseArr[CaseArr.length-i];
     chart_data1.push(info_total);
    }
    //데이터 시간 순으로 변경
    chart_data1.reverse();
    Chart_confirmed.update();
  });

  //차트 라벨 - 확진자 변화 x축
  var chart_labels1 = Chart_confirmed.data.labels
  //차트 라벨 - 사망자 변화 x축
  var chart_labels2 = Chart_deaths.data.labels
  //차트 라벨 - 회복자 변화 x축
  var chart_labels3 = Chart_recovered.data.labels

  // 차트에 바뀐 데이터 반영 함수
  function Update () {
    Chart_confirmed.update();
    Chart_deaths.update();
    Chart_recovered.update();
  }

  // sessionStorage에 저장된 설정 국가
  var option_value = sessionStorage.getItem("option")

  // 그래프 초기 값 설정 - 국가 설정 유도
  if(option_value== null){
    option_value = "south-africa"
  }

  // 설정된 국가에 따른 데이터 차트에 반영
  $.ajax({
      "url": "https://api.covid19api.com/total/country/"+option_value,
      "method": "GET",
      "timeout": 0,
    }).done(function (response) {
      
    console.log(response);
      //최근 정보 4개만 chart_data1_1,2,3에 담기
      for(var i=4; i>=1; i--){
        // 설정된 국가의 확진자 데이터
        var info_Confirmed = response[response.length-i].Confirmed;
        // 설정된 국가의 사망자 데이터
        var info_Deaths = response[response.length-i].Deaths;
        // 설정된 국가의 회복자 데이터
        var info_Recovered = response[response.length-i].Recovered;
  
        chart_data1_1.push(info_Confirmed);
        chart_data2.push(info_Deaths)
        chart_data3.push(info_Recovered)
        Update();
      }
  
      // 최근 정보가 기록된 Date 차트 라벨에 반영 
      for (var i=4; i>=1; i--){
        var info_date = response[response.length-i].Date;
        // month 영문 표기로 변환 배열
        var monthNames = ["Jan", "Feb", "Mar", "Apr","May", "Jun","Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
        // String으로 되어있는 Date에서 월, 일 추출
        var month = info_date.substring(5,7);
        var day = info_date.substring(8,10);
        // 원하는 형식으로 출력
        var answers = day+"-"+monthNames[parseInt(month-1)]

        //차트에 라벨 적용
        chart_labels1.push(answers)
        chart_labels2.push(answers)
        chart_labels3.push(answers)
        Update();
      }

      // input 값 변경 시 선택값 출력
      $("#select").change(function(){
        selected_value = $("#countries option:selected").text()
        console.log(selected_value)
        // selected value url 형식에 맞게 변환
        if(selected_value == 'United States of America'){
          selected_value = "United States"
        } else if(selected_value == "Côte d'Ivoire"){
          selected_value = "Cote-dIvoire"
        }
        selected_value.replace(/[()']/gi,"").replace(/\,.*/,"").replace("Republic-of-",'').replace(/ /gi,"-").toLowerCase();
      });

      // 선택 버튼 클릭시 sessionStorage에 저장
      $("#btn_select").click(function(){
        sessionStorage.setItem("option",selected_value);
      });
    });