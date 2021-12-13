$(document).ready(function(){
  

  $(".slide_img").each(function(index){
    $(this).attr("data-index", index);
  });

  var pages = $("#page_number");
  var i = 0;
  $("#right").click(function(){
    i++;
    if(i>2){
      i = 0;
    }
    pages.html("0"+[i+1]);
    $(".slide_img").removeClass("main");
    $(".slide_img[data-index="+i+"]").addClass("main");
  });

  $("#left").click(function(){
    i--;
    if(i<0){
      i=2;
    }
    pages.html("0"+[i+1]);
    $(".slide_img").removeClass("main");
    $(".slide_img").eq(i).addClass("main");
   
  });

  setInterval( function(){
    $("#right").trigger("click");
  },3000);
  

 
  /* Reservation jquery */
  // Theam 지정
  $('#thema').change(function(){

    // 변수 select_thema: 선택된 Thema 값
    var select_thema = $(this).children('option:selected').text();
    // 선택된 option label에 표시
    $(this).siblings('label').text(select_thema);

    //  Thema 변경 시 space 초기값으로
    $("#spaceBox >label").text("Space");
    
    // 변수 a: rustic, modern의 세번째 option
    if(select_thema == "Rustic"){
      a = "Cafe"+"&amp"+"Bar"
    } else if(select_thema == "Modern"){
      a = "Multipurpose"+"&#32;"+"Space"
    }
    //변수 optgroup: 선택된 Thema에 따른 optgroup 값
    var optgroup = '<optgroup label='+select_thema+'><option value="Kitchen" selected>Kitchen</option><option value="Living Room">Living Room</option><option value='+a+'>'+a+'</option></optgroup>'

    // Thema 선택에 따라 알림 또는 space에 optgroup 넣기
    if(select_thema == "Thema"){
      $("#space").html("");
      alert("Thema를 선택해주세요.");
    } else{
      $("#space").html(optgroup);
    }
  });

  // space 지정 후, seleced option label에 표시
  $("#space").change(function(){
    var select_space = $("optgroup").children('option:selected').text();
    $(this).siblings('label').text(select_space);
  });

  // 예약 날짜 지정
  // 변수 now: 오늘 date
  var now = new Date();
  // 변수 monthNames: 달력 영어 표시
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //오늘 date '일' 출력
  $("#day").text(now.getDate());
  //오늘 date '월' 출력 후 영어로 변환
  $("#month").text(monthNames[now.getMonth()]);

  // input date 입력후 날짜 변경
  $("#reservation_date").change(function(){
    // 변수 d: 사용자가 입력한 date
    var d = new Date($(this).val());
    //입력된 date '일' 출력
    $("#day").text(d.getDate());
    //입력된 date '월' 출력 후 영어로 변환
    $("#month").text(monthNames[d.getMonth()]);
  });

  $("#checkIn>p").text(now.getHours()+":"+now.getMinutes());
  $("#checkOut>p").text(now.getHours()+2+":"+now.getMinutes());
 
  $("#start").change(function(){
    var input_t1 = $("#start").val();
    $("#checkIn>p").text(input_t1);
  });

  $("#end").change(function(){
    var input_t2 = $("#end").val();
    $("#checkOut>p").text(input_t2);
  });
 
  // console.log(now_t[0]);
  // $("#start").change(function(){
  //   var t = $(this).val()
  //   $("#checkIn>p").text(t.getTime())
  // });

  // 예약하기 form 제출

  /* Topbtn Up animation */
  $("#Topbtn").click(function(){
    $('html').animate({
      scrollTop:0
    },1000);
  });

  /* Slide jquery */
  // 변수 full: slide_bar 전체 길이
  var full = $('#slide_bar').width();
  // 변수 slide_L: slide 갯수
  var slide_L= $('.slide').length;
  // 변수 bar: slide 한 개에 따른 gauge_bar 길이
  var bar = full/slide_L;

  // slide_wrap 전체 길이
  $("#portfolio_slide").css({
    width: 1000*slide_L - 40
  });

  // 초기 gauge bar 폭 설정
  $("#gauge_bar").css({
    width: bar
  })

  // slide img 순번 
  $('#portfolio_slide>li').each(function(index){
    $(this).attr('data-index',index);
  })

  setInterval(function(){
    $('#portfolio_slide>li').eq(0).appendTo("#portfolio_slide");
    i = $('#portfolio_slide>li').eq(0).attr('data-index');
    i++
    $("#gauge_bar").css("width", bar*i); 
  },3000);


  /* scrollTop 구간 별 thema img txt animate */
  $(window).scroll(function(){
    src = $(window).scrollTop();

    // scrollTop==0 or !=0 일때
    if(src == 0){
      // header 원상태
      $("header").css({
        top:25,
        backgroundColor:'rgba(0, 0, 0, 0)'
      });
      // Topbtn hide
      $("#Topbtn").css({
        display:'none'
      });

    } else if(src > 0){
      // header bg 어둡게
      $("header").css({
        top:0,
        backgroundColor:'rgba(59, 59, 59, 0.7)'
      });
      // Topbtn show
      $("#Topbtn").css({
        display : "flex"
      });
    }

    // srcollTop 위치에 따른 img txt animation 적용
    if(src >= 700 && src < 1420){

      //rustic01
      $("#rustic01 .thema_txt").animate({
        margin:"0 50px 0 0",
        opacity:1
      });
      $("#rustic01 .thema_img").animate({
        right:0,
        opacity:1
      },1500);

    } else if(src >= 1420 && src < 1800){
      //rustic02
      $("#rustic02 .thema_txt").animate({
        margin:"0 0 0 50px",
        opacity:1
      });
      $("#rustic02 .thema_img").animate({
        left:0,
        opacity:1
      },1500);
    } else if(src >= 1800 && src < 2460){

      //rustic03
      $("#rustic03 .thema_txt").animate({
        margin:"0 50px 50px 0",
        opacity:1
      });
      $("#rustic03 .thema_img").animate({
        right:0,
        opacity:1
      },1500);
    }else if(src >= 3180 && src < 3684){
      //modern01
      $("#modern01 .thema_txt").animate({
        margin:"50px 0 0 50px",
        opacity:1
      });
      $("#modern01 .thema_img").animate({
        left:0,
        opacity:1
      },1500);
    }else if(src >= 3800 && src < 4000){
      //modern02 img && modern03 txt
      $("#modern02 .thema_img").animate({
        right:0,
        opacity:1
      },1500);
      $("#modern03 .thema_txt").animate({
        margin:"0 0 50px 0",
        opacity:1
      });
      
    }else if(src >= 4000 && src < 4500){
      //modern02 txt && modern03 img
      $("#modern02 .thema_txt").animate({
        margin:"50px 0 0 80px",
        opacity:1
      });
      $("#modern03 .thema_img").animate({
        left:0,
        opacity:1
      },1500);
    }
    }); //Scroll End

}); //End