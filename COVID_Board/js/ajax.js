$(window).ready(function(){

  // 전세계 코로나 정보 호출
  $.ajax({
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0
  }).done(function (response) {
    var TotalConfirmed = response.Global.TotalConfirmed.toLocaleString('en');
    var NewConfirmed = response.Global.NewConfirmed;
    var TotalDeaths = response.Global.TotalDeaths.toLocaleString('en');
    var NewDeaths = response.Global.NewDeaths;
    var TotalRecovered = response.Global.TotalRecovered.toLocaleString('en');
    var NewRecovered = response.Global.NewRecovered;

    // 전세계 확진자 수
    $(".number[data-info='Confirmed']").append(
      TotalConfirmed + "명"
    );
    $(".New[data-info='Confirmed']").append(
      NewConfirmed.toLocaleString('en')
    );

    // 전세계 사망자 수
    $(".number[data-info='Deaths']").append(
      TotalDeaths + "명"
    );
    $(".New[data-info='Deaths']").append(
      NewDeaths.toLocaleString('en')
    );

    // 전세계 회복자 수
    $(".number[data-info='Recovered']").append(
      TotalRecovered + "명"
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
  });

  // 국가 설정 박스 option 목록 생성
  $.ajax({
    "url": "https://api.covid19api.com/countries",
    "method": "GET",
    "timeout": 0
  }).done(function(response){
    for(let i=0; i<response.length; i++){
      var data = response[i].Country
      $("#countries").append("<option value='"+data+"'>"+data+"</option>")
    }
  });

 
});
