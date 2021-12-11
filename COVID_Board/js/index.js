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
});