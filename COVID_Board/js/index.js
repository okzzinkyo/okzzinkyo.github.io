$(window).ready(function(){
  function control_hide() {
    $("#control_box").css({
      height:0
    }).removeClass("show");
  } 

  $("#btn_control").click(function(){
    // 버튼 클릭 시 컨트롤 박스 Show
    if($("#control_box").hasClass("show") == false){
      $("#control_box").css({
        height:150
      }).addClass("show");
  
    } else if($("#control_box").hasClass("show") == true){
      control_hide();
    }
  });

  // 예방 방법 page
  // 관련 기관 연락처 초기 상태 : show
  $(".list_item:last-child .arrow").css({
    transform: "translateY(-50%) rotateZ(-180deg)"
  })
  
  // 선택한 list show & hide
  $("#prevention_list > li").each(function(index){
    $(this).attr('data-index',index);
  }).click(function(){
    // 선택한 li indext 번호
    var i = $(this).attr('data-index');
    // 선택한 li의 보여줄 자식요소
    var target = $(".list_item[data-index="+i+"] > :last-child");
    // 선택한 li 화살표 요소
    var target_arrow = $(".list_item[data-index="+i+"] .arrow");
    
    if(target.hasClass('show') ==false){
      // show
      target.slideDown();
      target_arrow.css({
        transform: "translateY(-50%) rotateZ(-180deg)"
      })
      target.addClass('show');
    } else if( target.hasClass('show') ==true){
      // hide
      target.slideUp();
      target.removeClass('show');
      target_arrow.css({
        transform: "translateY(-50%)"
      })
    }
  })
})