function chart_total(){
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
      Chart_confirmed.data.datasets[0].data.push(info_total);
    }
    //데이터 시간 순으로 변경
    Chart_confirmed.data.datasets[0].data.reverse();
    Chart_confirmed.update();
  });
}


function chart_Date (info_date,chart_labels){
  // month 영문 표기로 변환 배열
  var monthNames = ["Jan", "Feb", "Mar", "Apr","May", "Jun","Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
  // ISO8601형식 String으로 되어있는 Date에서 월, 일 추출
  var month = info_date.substring(5,7);
  var day = info_date.substring(8,10);
  // 원하는 형식으로 출력
  var answers = day+"-"+monthNames[parseInt(month-1)]
  //차트에 라벨 적용
  chart_labels.push(answers)
}

function select_country(option_value){
  Chart_confirmed.data.datasets[1].data = [];
  Chart_deaths.data.datasets[0].data = [];
  Chart_recovered.data.datasets[0].data = [];
  Chart_confirmed.data.labels = [];
  Chart_deaths.data.labels = [];
  Chart_recovered.data.labels = [];

  $.ajax({
    "url": "https://api.covid19api.com/total/country/"+option_value,
    "method": "GET",
    "timeout": 0
  }).done(function (response){
    console.log(response)
    //최근 정보 4개만 chart_data1_1,2,3에 담기
    for(var i=4; i>=1; i--){
      // 설정된 국가의 확진자 데이터
      var info_Confirmed = response[response.length-i].Confirmed;
      // 설정된 국가의 사망자 데이터
      var info_Deaths = response[response.length-i].Deaths;
      // 설정된 국가의 회복자 데이터
      var info_Recovered = response[response.length-i].Recovered;
      var info_date = response[response.length-i].Date;

      Chart_confirmed.data.datasets[1].data.push(info_Confirmed);
      chart_Date(info_date,Chart_confirmed.data.labels);

      Chart_deaths.data.datasets[0].data.push(info_Deaths);
      chart_Date(info_date,Chart_deaths.data.labels);

      Chart_recovered.data.datasets[0].data.push(info_Recovered);
      chart_Date(info_date,Chart_recovered.data.labels);

    }
    console.log("완료2");
    control_hide();
    Chart_confirmed.update();
    Chart_deaths.update();
    Chart_recovered.update();
  });
}

$(document).ready(function(){
  
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
      // console.log(data)
      if(data != "Saint Vincent and Grenadines"){
        $("#countries").append("<option value='"+data+"'>"+data+"</option>")        
      }
    }

  });


  //최근 4일 전세계 COVID19 확진자수 및 default 값 지정ㄴ
  chart_total();
  select_country("south-africa");

  // input 값 변경 시 선택값 출력
  $("#countries").change(function(){
    var option_value = $("#countries option:selected").text();

    // selected value url 형식에 맞게 변환
    if(option_value == 'United States of America'){
      option_value = "United States"
    } else if(option_value == "Côte d'Ivoire"){
      option_value = "Cote-dIvoire"
    }
    var reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
    var option_value = option_value.replace(reg, "");
    
    option_value.replace(/\,.*/,"").replace("Republic-of-",'').replace(/ /gi,"-").toLowerCase();
    console.log(option_value);
      // 설정된 국가에 따른 데이터 차트에 반영
    select_country(option_value);
    control_hide();

    console.log("두둥")
  });
  
  
});

  