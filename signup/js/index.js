var is_name = 0;
var is_phone = 0;
var is_email = 0;
var is_SSN = 0;
var is_asset = 0;




//모음, 자음을 제외한 한글 정규식
function isName(value) {
   var ko = /^[가-힣]+$/;
  return ko.test(value);
}

function isPhone(value) {
  var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regPhone.test(value);
}

function isEmail(value) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(value);
}

function isSSN(value) {
  var regssn = /^[0-9]{6}$/
}
      

$(document).ready(function () {
  
  $("input").each(function (index) {
    $(this).attr("index", index);
  });

  $("#name").keypress(function (e) { 
    var Namevalue = $("#name").val();
    if (e.keyCode == 13) {
      console.log("엔터성공");
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");

      if (isName(Namevalue)) {
        is_name = 1;
        nextInput.focus();
        $("#name_error").html("");
      } else {
        is_name = 0;
        $("#name_error").html("이름을 올바르게 입력해주세요.");
      }

      //핸드폰 번호 유효성
      if (isPhone(Phonevalue)) {
        is_name = 1;
        nextInput.focus();
        $("#phone_error").html("");
      } else {
        is_name = 0;
        $("#phone_error").html("이름을 올바르게 입력해주세요.");
      }
    }
  });

  $("#phone").change(function () {
    var data = $(this).val();
    data.replace("/([0-9]{3})([0-9]{3,4})([0-9]{4})$/", "\\1-\\2-\\3");
  });

});

