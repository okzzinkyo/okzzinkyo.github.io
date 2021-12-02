$(document).ready(function(){
  AOS.init();

  // $("#slide_dot > p").each(function(index){
  //   $(this).attr("index-data",index);
  // }).click(function(){
  //   var a = $(this).attr("index-data");
  //   $("#naru_slide_wrap").animate({
  //     left: -100*a+"%"
  //   },1000);
  //   $("#slide_dot > p").removeClass("order");
  //   $("#slide_dot > p").eq(a).addClass("order");
  // });

  // slide01 naru-slide
  var i = 0;
  $(".right").click(function(){
    i++;
    if(i<3){
      $("#naru_slide_wrap").animate({
        left: -100*i+"%"
      },1000);
    }else{
      $("#naru_slide_wrap").animate({
        left: 0
      }); 
      i=0;
    }
    $("#slide01_dot > p").removeClass("order");
    $("#slide01_dot > p").eq(i).addClass("order");
  });

  var st = setInterval(function () {
    $(".right").trigger("click");
  }, 3000);

  function header (){
    $("header").css({
      backgroundColor: "#ffffff",
      boxShadow: "0 3px 10px rgba(30,73,108,0.2)"
    });
  }

  function headerOut(){
    $("header").css({
      backgroundColor: "",
      boxShadow:""
    });
  }

  // header menu bar
  $(window).scroll(function(){
    scTop = $(window).scrollTop();
    
    if(scTop > 0 && $("header").hasClass("bag") == false){
      $("header").addClass("bag");
      header();
    }else if(scTop <= 0 && $("header").hasClass("bag") == true){
      $("header").removeClass("bag");
      if($("#m_menu").hasClass("show") == false){
        headerOut();  
      }
    }
  })

  var m_menu_hide = function(){
    $("#m_menu").slideUp().removeClass("show");
    $("#shadow").hide();
  }
  var m_menu_show = function(){
    $("#shadow").show();
    $("#m_menu").slideDown().addClass("show");
  }

  //side btn click menu bar show
  $("#side_btn").click(function(){
    if($("#m_menu").hasClass("show") == false){
      m_menu_show();
      header();
    }else if($("#m_menu").hasClass("show") == true){
      m_menu_hide();
      if($("header").removeClass("bag") == false){
        headerOut();
      }
    }
  });

  $("#shadow").click(function(){
    m_menu_hide();
  })

  // menu bar Click menu hide
  $("#m_menu").click(function(){
    m_menu_hide();
    console.log("된거야???")
  });

        // // submit 유효성 체크!!
        // var is_name = 0;
        // var is_email = 0;
        // var is_text = 0;
  
        // function checkinput() {
        //   var From = $("#from").val();
        //   var contact = $("#contact").val();
        //   var title = $("#title").val();
  
        //   if (From == "" || From == null) {
        //     is_name = 0;
        //     $("#from").addClass("error");
        //     $("#from::placeholder").html(
        //       "보내시는 분 또는 기업 명을 입력해주세요."
        //     );
        //   } else {
        //     is_name = 1;
        //     $("#userID").removeClass("error");
        //     $("#ID-error").html("");
        //   }
  
        //   if (EMAILvalue == "" || EMAILvalue == null) {
        //     is_email = 0;
        //     $("#userEMAIL").addClass("error");
        //     $("#EMAIL-error").html(
        //       "<span class='label ff-desciption fs-tiny'>" +
        //         "※ 메일 주소를 입력해주세요." +
        //         "</span>"
        //     );
        //   } else {
        //     if (isEmail(EMAILvalue)) {
        //       is_email = 1;
        //       $("#userEMAIL").removeClass("error");
        //       $("#EMAIL-error").html("");
        //     } else {
        //       is_email = 0;
        //       $("#userEMAIL").addClass("error");
        //       $("#EMAIL-error").html(
        //         "<span class='label ff-desciption fs-tiny'>" +
        //           "※ 올바른 형식의 메일을 입력해주세요." +
        //           "</span>"
        //       );
        //     }
        //   }
  
        //   if (TEXTvalue == "" || TEXTvalue == null) {
        //     is_text = 0;
        //     $("#userTEXT").addClass("error");
        //     $("#TEXT-error").html(
        //       "<span class='label ff-desciption fs-tiny'>" +
        //         "※ 문의하실 내용을 입력해주세요." +
        //         "</span>"
        //     );
        //   } else {
        //     is_text = 1;
        //     $("#userTEXT").removeClass("error");
        //     $("#TEXT-error").html("");
        //   }
        //   if (is_name == 1 && is_email == 1 && is_text == 1) {
        //     $(".btn-submit").submit();
        //   }
  
        //   // 유효성 test 후 input blur시 다시 유효성 test
        //   $("#userID").blur(function () {
        //     checkinput();
        //   });
        //   $("#userEMAIL").blur(function () {
        //     checkinput();
        //   });
        //   $("#userTEXT").blur(function () {
        //     checkinput();
        //   });
  
        //   // inputfocus시 error 효과 지우기
        //   $("#userID").focus(function () {
        //     $("#userID").removeClass("error");
        //     $("#ID-error").html("");
        //   });
        //   $("#userEMAIL").focus(function () {
        //     $("#userEMAIL").removeClass("error");
        //     $("#EMAIL-error").html("");
        //   });
        //   $("#userTEXT").focus(function () {
        //     $("#userTEXT").removeClass("error");
        //     $("#TEXT-error").html("");
        //   });
        // }
  
        // function isEmail(EMAILvalue) {
        //   var regex =
        //     /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //   return regex.test(EMAILvalue);
        // }
  
});