var is_name = 0;
var is_phone = 0;
var is_emailID = 0;
var is_domain = 0;
var is_SSN = 0;
var is_asset = 0;

// if (isName(value)) {
//   is_name = 1;
// }

// if (isPhone(value)) {
  
// }

//모음, 자음을 제외한 한글 정규식
function isName(value) {
   var ko = /^[가-힣]+$/;
  return ko.test(value);
}

//핸드폰 번호 정규식
function isPhone(value) {
  var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regPhone.test(value);
}

//이메일 ID 정규식
function isEmailID(value) {
  var regID = /^([a-zA-Z0-9_.-])+$/;
  return regID.test(value);
}

//이메일 Domain 정규식
function isDomain(value) {
  var regDomain = /^(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regDomain.test(value);
}

//주민등록 번호 정규식
function isSSN(value) {
  var regssn = /^[0-9]{6}$/
   return regssn.test(value)
}

function isSSNback(value) {
  var regssn = /^[0-9]{7}$/
   return regssn.test(value)
}

//핸드폰 번호 자동 하이픈 추가 기능
function autoHypen(str) {
  var str = str.replace(/[^0-9]/g, '');
  var tmp = '';
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {2
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
}

//콤마 적용
function comma(price) {
    return price.toString().replace(/,/gi, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



$(document).ready(function () {

  $("input").each(function (index) {
    $(this).attr("index", index);
  });
  
  // var inputID = $("input[index='" + index + "']").attr("id");
  $("label:not(label[for='name'])").hide();

  //keyup시 자동 하이픈 생성
  $("#phone").on("keyup",function (e) {
    e = e || window.e;
    var data = $(this).val().trim();
    this.value = autoHypen(data);
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
      var labelID = $("input[index='" + index + "']").attr("id");
      var inputID = $("input[index='" + (index + 1) + "']").attr("id");
      
      // var nextID = $("input[index='" + (index+1) + "']").attr("id");
      
      console.log(isName(Namevalue))
      if (isName(Namevalue)) {
        $("label[for='" + inputID + "']").show();
        nextInput.show();
        nextInput.focus();

        $("input[index='"+index+"']").removeClass("error");
        $("label[for='"+labelID+"']").removeClass("error");
        $("#name_error").html("");
      } else {
        is_name = 0;
        $("input[index='"+index+"']").addClass("error");
        $("label[for='"+labelID+"']").addClass("error");
        $("#name_error").html("※ 이름을 올바르게 입력해주세요.");
      }
    }
  });

  $("#name").focusout(function () {
    var Namevalue = $("#name").val();
    // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = $("input[index='" + index + "']").attr("id");
    var inputID = $("input[index='" + (index + 1) + "']").attr("id");
    
    if (isName(Namevalue)) {
        $("label[for='" + inputID + "']").show();
        nextInput.show();
        nextInput.focus();

        $("input[index='"+index+"']").removeClass("error");
        $("label[for='"+labelID+"']").removeClass("error");
        $("#name_error").html("");
      } else {
        is_name = 0;
        $("input[index='"+index+"']").addClass("error");
        $("label[for='"+labelID+"']").addClass("error");
        $("#name_error").html("※ 이름을 올바르게 입력해주세요.");
    }
    
  })


  //Enter시 핸드폰 번호 유효성
  $("#phone").keypress(function (e) {
    var Phonevalue = $("#phone").val();
    if (e.keyCode == 13) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = $("input[index='" + index + "']").attr("id");
      var inputID = $("input[index='" + (index + 1) + "']").attr("id");
     
      
      console.log(isPhone(Phonevalue))
      if (isPhone(Phonevalue)) {
        
        $("label[for='" + inputID + "']").css({
          display: "inline-block"
        });
        $("span."+inputID+"").css({
          display: "inline-block"
        });
        $("input[index='" + (index + 2) + "']").css({
          display: "inline-block"
        });
        
        nextInput.css({
          display: "inline-block"
        });;
        nextInput.focus();

        $("input[index='" + index + "']").removeClass("error");
        $("label[for='"+labelID+"']").removeClass("error");
        $("#phone_error").html("");
      } else {
        is_phone = 0;
                
        $("input[index='" + index + "']").addClass("error");
        $("label[for='"+labelID+"']").addClass("error");
        $("#phone_error").html("※010,011,016,017,018,019만 가능합니다.");
      }
    }
  })
 
  //Enter시 이메일 ID 유효성
  $("#email_ID").keypress(function (e) {
    var IDvalue = $("#email_ID").val();
    if (e.keyCode == 13) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = $("input[index='" + index + "']").attr("id");
     
      console.log(isEmailID(IDvalue))
      if (isEmailID(IDvalue)) {
        nextInput.focus();
        $("input[index='" + index + "']").removeClass("error");
        $("label[for='"+labelID+"']").removeClass("error");
        $("#email_error").html("");
      } else {
        is_emailID = 0;
        $("input[index='" + index + "']").addClass("error");
        $("label[for='"+labelID+"']").addClass("error");
        $("#email_error").html("※ 영문,숫자,특수문자(.-_)포함 8~15자로 입력해주세요.");
      }
    }
  });

  //Enter시 이메일 Domain 유효성
  $("#email_Domain").keypress(function (e) {
    var DOMAINvalue = $("#email_Domain").val();
    if (e.keyCode == 13) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = $("input[index='" + (index - 1) + "']").attr("id");
      var inputID = $("input[index='" + (index + 1) + "']").attr("id");
     
      
      console.log(isDomain(DOMAINvalue))
      if (isDomain(DOMAINvalue)) {
        $("label[for='" + inputID + "']").css({
          display: "inline-block"
        });
        $("span."+inputID+"").css({
          display: "inline-block"
        });
        $("input[index='" + (index + 2) + "']").css({
          display: "inline-block"
        });
        
        nextInput.css({
          display: "inline-block"
        });;

        nextInput.focus();
        $("input[index='" + index + "']").removeClass("error");
        $("label[for='"+labelID +"']").removeClass("error");
        $("#email_error").html("");
      } else {
        $("input[index='" + index + "']").addClass("error");
        $("label[for='"+labelID +"']").addClass("error");
        $("#email_error").html("※ (예:vinnsmail.com)와 같이 올바른 도메인으로 입력해주세요.");
      }
    }
  });

  //Enter시 주민등록번호 유효성 - 앞
  $("#SSN_front").on("keyup",function () {
    var frontvalue = $("#SSN_front").val();
    if (frontvalue.length >= 6) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var inputID = $("input[index='" + index + "']").attr("id");
     
      
      console.log(isSSN(frontvalue))
      if (isSSN(frontvalue)) {
        $("input[index='" + index + "']").removeClass("error");
        $("label[for='"+inputID+"']").removeClass("error");
        $("#SSN_back").removeAttr("disabled");
        nextInput.focus();
        $("#SSN_error").html("");
      } else {
        $("input[index='" + index + "']").addClass("error");
        $("label[for='"+inputID+"']").addClass("error");
        $("#SSN_error").html("※ 생년월일 6자리 입력해주세요");
      }
    }
  });

  $("#SSN_front").change(function () {
    
  });



  //Enter시 주민등록번호 유효성 - 뒤
  $("#SSN_back").keypress(function (e) {
    var backvalue = $("#SSN_back").val();
    if (e.keyCode == 13) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var inputID = $("input[index='" + (index+1) + "']").attr("id");
      var lebelID = $("input[index='" + (index-1) + "']").attr("id");
     
      console.log(isSSNback(backvalue))
      if (isSSNback(backvalue)) {
        $("label[for='" + inputID + "']").show();
        $("p." + inputID + "> span").css({
          display: "inline-block"
        });
        nextInput.show();
        nextInput.focus();
        $("input[index='" + index + "']").removeClass("error");
        $("label[for='"+lebelID+"']").removeClass("error");
        $("#SSN_error").html("");
      } else {
        $("input[index='" + index + "']").addClass("error");
        $("label[for='"+lebelID+"']").addClass("error");
        $("#SSN_error").html("※ 주민등록번호 뒤 7자리 입력해주세요");
      }
    }
  });

  //자산 천단위로 콤마 넣기
  $("#asset").on("keyup", function () {
    var ASSETvalue = $(this).val();
    $(this).val(comma(ASSETvalue));    
    console.log(comma(ASSETvalue));
    
    //보유자산 한글표기
    var number_arr = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
    var unit_arr = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천",);
    // var result = "";
    var num = ASSETvalue.replace(/,/gi, '');
    var result = ''
    for (var i = 0; i < num.length; i++){
    str = '';
    // var value = num.charAt(num.length - 1 - i);
      
    var ko_num = number_arr[num.charAt(num.length - 1 - i)];
    console.log(number_arr[num.charAt(num.length - 1 - i)]);
      
    if (ko_num != "") {
      str += ko_num + unit_arr[i];
    }

    if (i == 4){ str += "만";}
    if (i == 8){ str += "억";}
    if (i == 12) {str += "조";}
    result = str + result;

    }

    $("#won").html(result);
    
  });

  $("#asset").keypress(function (e) {
    if (e.keyCode == 13) {

      $("#btn_join").removeAttr("disabled");
      e.preventDefault();
    }
  });

  $("#btn_join").click(function () {
    alert("회원가입 성공");
  })
  


  
    
  // var value = 10000;
  // console.log(change(value));
  
});

