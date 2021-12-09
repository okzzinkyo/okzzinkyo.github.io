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


});