$(window).ready(function(){

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
    for(let i=0; i<response.Countries.length; i++){
      var data = response.Countries[i].Country
      $("#countries").append("<option value='"+data+"'>"+data+"</option>")
    }
  });

  // 그래프 초기 값 설정 - 국가 설정 유도
  Selected= [];
  $.ajax({
    "url": "https://api.covid19api.com/total/country/south-africa",
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {
    for(let i=1; i<5; i++){
      var info_default = response[response.length-i];
      Selected.push(info_default);
    }
    localStorage.setItem('country',JSON.stringify(Selected))
  });

  //나라 선택시 최근 4일 COVID 정보 배열에 담기
  $("#select").change(function(){
    // selected value url 형식에 맞게 변환
    var data = $("#countries option:selected").text().replace(/ /gi,"-").toLowerCase();

    //API 필요 데이터 추출
    $.ajax({
      "url": "https://api.covid19api.com/total/country/"+data,
      "method": "GET",
      "timeout": 0,
    }).done(function (response) {
      console.log(response)
      for(let i=1; i<5; i++){
        var info = response[response.length-i];
        Selected.push(info);
      }
      if(response ==null){
        return false;
      }
    });
    console.log(Selected);
  });

  // 설정 btn click -> localStorage 데이터 저장
  $("#btn_select").click(function(){
    localStorage.clear();
    localStorage.setItem('country',JSON.stringify(Selected))
  })

  // 
});
