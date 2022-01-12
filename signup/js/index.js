var is_name = 0;
var is_phone = 0;
var is_email = 0;
var is_SSN = 0;
var is_asset = 0;

function Vailidate() {
  var Namevalue = $("#name").val();
  console.log(isName("ㅏ"));
  if (isName(Namevalue)) {
    is_name = 1;
  } else {
    is_name = 0;
    $("#name_error").html(
      "<span class='error-msg'>" + "이름을 올바르게 입력해주세요." + "</span>"
    );
  }
}

//
function isName(value) {
   var ko = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/gm;
  return ko.test(value);
}


$(document).ready(function () {
  
  $("input").each(function (index) {
    $(this).attr("index", index);
  });

  $("input").keypress(function (e) {
    
    if (e.keyCode == 13) {
      console.log("엔터성공");
      Vailidate();
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      if (is_name == 1) {
      nextInput.focus();        
      }
      console.log("nextInput")

    }
  });

});

