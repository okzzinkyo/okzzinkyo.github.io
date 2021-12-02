$(window).ready(function(){
  // header 배경색 적용
  function header_bg (){
    $('header').css({
      backgroundColor: "#ffffff",
      boxShadow: "0 3px 10px 0 #2779511e"
    });
  }

  // header 배경색 초기화
  function header_remove (){
    $('header').css({
      backgroundColor: "initial",
      boxShadow: "none",
      transitionDuration: 0.5
    });
  }

  // 스크롤 할때, header 배경색 적용 & 해제
  $(window).scroll(function(){
    var w_scT = $(window).scrollTop();
    if(w_scT > 0 && $('header').hasClass("move") == false){
      header_bg();
      $('header').addClass("move");
    }else if(w_scT == 0 && $('header').hasClass("move") == true){
      if($("#side_bar").hasClass("clicked") == false){
        header_remove();  
      }
      $('header').removeClass("move");
    };
  });

  // side menu 나타내기 & 배경 어둡게
  function side_show(){
    $("#side_bar").addClass("clicked");
    $("#menu_mo").animate({
      right :0
    });
    $("#shadow").fadeIn(500);
  }

  // side menu 숨기기 & 배경 밝게
  function side_hide(){
    $("#side_bar").removeClass("clicked");
    $("#menu_mo").animate({
      right :-500
    });
    $("#shadow").fadeOut();
  }

 
  // 햄버거 메뉴 클릭시 side_menu나타내기 & 숨기기 적용
  $("#side_bar").click(function(){
    if( $(this).hasClass("clicked") ==true){
      side_hide();
      if($('header').hasClass("move") == false){
        header_remove();        
      }
    } else if( $(this).hasClass("clicked") ==false){
      side_show();
      if($('header').hasClass("move") == false){
        header_bg ();
      }
    }
  });

  // 어두운 배경 클릭시 side_menu 숨기기
  $("#shadow").click(function(){
    if( $("#side_bar").hasClass("clicked") ==true){
      side_hide();
      if($('header').hasClass("move") == false){
        header_remove();        
      }
    }
  });
  
  // resize
  $(window).resize(function(){
    // side_bar 초기화
    $("#menu_mo").hide();
    $("#shadow").hide();
    $("#side_bar").removeClass("clicked");
  });

  // section02 menu
  $(".foodMenu_item").click(function(){
    i = $(this).attr("data-name");
    //클릭한 음식 종류의 하부메뉴 적용
    $(".fooditem[data-name !="+i+"]").hide();
    $(".fooditem[data-name ="+i+"]").fadeIn(1000);
    $(".fooditem[data-name ="+i+"]").css({
      display:"flex"
    })
    // 
    $(".foodMenu_item[data-name !="+i+"]").removeClass("selected");
    $(".foodMenu_item[data-name ="+i+"]").addClass("selected");
    console.log(i);
  });

  $(window).scroll(function(){
    var scT = $(window).scrollTop();
    if( scT > 470 && scT < 800){
      // section02 에니메이션
      $("#section02 .title").animate({
        top:0,
        opacity:1
      },1000)
      $("#foodMenu").delay(300).animate({
        top:0,
        opacity:1
      },1000)
      $("#seasonal_item").delay(800).animate({
        opacity:1
      },1000)
    }else if(scT >= 1540  && scT < 1800){
      //section03 step 에니메이션 적용
      $("#step01>.circle,#step01> h3,#step01> p").animate({
        top:0,
        opacity:1
      },500);
      $("#step02>.circle,#step02> h3,#step02> p").delay(300).animate({
        top:0,
        opacity:1
      },500);
      $("#step03>.circle,#step03> h3,#step03> p").delay(600).animate({
        top:0,
        opacity:1
      },500);
      $("#step04>.circle,#step04> h3,#step04> p").delay(900).animate({
        top:0,
        opacity:1
      },500);
    }else if(scT >=1800  && scT <2500){
      // section04 app 이미지 이니메이션 적용
      $("#section04_img img").animate({
        marginLeft:0,
        opacity:1
      },1000);      
    }else if(scT >=2500  && scT <3500){
      // section05 에니메이션 적용
      $("#section05").animate({
        opacity:1
      },1000);      
    }else if(scT >=3500  && scT <4500){
      // article 에니메이션 적용
      $("article .title").animate({
        top:0,
        opacity:1
      },500);
      $("article .sub_title").delay(300).animate({
        top:0,
        opacity:1
      },500);  
      $("#article_wrap").delay(800).animate({
        opacity:1
      },500);     
    }
  })

  // article 슬라이드
    var i = 0;
    $("#right").click(function(){
      i++;
      if(i>2){
        i=0;
      }
      $("#article_wrap").animate({
        left:-50*i+"%"
      });
    })

    $("#left").click(function(){
      i--;
      if(i<0){
        i=2;
      }
      $("#article_wrap").animate({
        left:-50*i+"%"
      });
    })

    setInterval(function () {
      $("#right").trigger("click");
    }, 3000);

});//End
