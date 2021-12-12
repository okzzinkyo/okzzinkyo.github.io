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

    // 국가 설정 박스 option 목록 생성
    for(let i=0; i<response.Countries.length; i++){
      var data = response.Countries[i].Country
      $("#countries").append("<option value='"+data+"'>"+data+"</option>")
    }
  });

  //나라 선택시 최근 4일 COVID 정보 배열에 담기
  Selected= [];
  $("#select").change(function(){
    // selected value url 형식에 맞게 변환
    var data = $("#countries option:selected").text().replace(/ /gi,"-").toLowerCase();

    //API 필요 데이터 추출
    $.ajax({
      "url": "https://api.covid19api.com/live/country/"+data+"/status/confirmed",
      "method": "GET",
      "timeout": 0,
    }).done(function (response) {
      for(let i=0; i<4; i++){
        var info = response[i];
        Selected.push(info)
      }

      if(response ==null){
        return false;
      }
    });
    console.log(Selected);
  });

  $.ajax({
    "url": "https://api.covid19api.com/export",
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {

   console.log(response);
  });

  // 설정 btn click -> localStorage 데이터 저장
  $("#btn_select").click(function(){
    localStorage.setItem('country',JSON.stringify(Selected))
  })

  // 
});
