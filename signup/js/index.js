var is_name = 0;
var is_phone = 0;
var is_emailID = 0;
var is_domain = 0;
var is_SSN = 0;
var is_asset = 0;

var namemsg = "※ 이름을 올바르게 입력해주세요."
var phonemsg = "※ 010,011,016,017,018,019 만 가능합니다."
var emailmsg = "※ 영문,숫자,특수문자(.-_)포함 8~15자로 입력해주세요."
var domainmsg = "※ (예:vinnsmail.com)와 같이 올바른 도메인으로 입력해주세요."
var SSNfront = "※ 생년월일 6자리 입력해주세요"
var SSNback = "※ 주민등록번호 뒤 7자리 입력해주세요"

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
  var regID = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])$/;
  return regID.test(value);
}

//이메일 Domain 정규식
function isDomain(value) {
  var regDomain = /^(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regDomain.test(value);
}

//주민등록 번호 정규식
function isSSN(value) {
  var regssn = /^[0-9][0-9][01][0-9][0-3][0-9]$/
   return regssn.test(value)
}

function isSSNback(value) {
  var regssn = /^([1-4]\d{6})$/
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

function next(inputID,nextInput) {
  $("label[for='" + inputID + "']").show();    
  nextInput.show();    
  nextInput.focus();
}

function pass(labelID,index) {        
  $("input[index='" + index + "']").removeClass("error");
  $("label[for='" + labelID + "']").removeClass("error");    
  $("#" + labelID + "_error").html("");
}

function error(index,labelID,text) {
  $("input[index='" + index + "']").addClass("error");
  $("label[for='" + labelID + "']").addClass("error");
  $("#" + labelID + "_error").html(text);
}

// 허용 외 키보드 입력 방지
function chk_input_filter(type, obj){

		var str = $(obj).val();

		if(type == 'alphabet'){
			//영문만 허용
			$(obj).val(str.replace(/[^a-z]/gi,""));
		}else if(type == 'number'){
			//숫자만 허용
			$(obj).val(str.replace(/[^0-9]/gi,""));
		}else if(type == 'email'){
			//이메일 숫자, 영어 특수문자(.-_)허용
			$(obj).val(str.replace(/[^a-zA-Z0-9.-_]/gi,""));
		}else if(type == 'non_spec'){
			//특수문자 비허용
			$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/]/gi,""));
		}else if(type == 'name'){
			//이름 한글만 허용
      $(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/a-zA-Z0-9]/gi, ""));
    }
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }    
}
  


$(document).ready(function () {

  $("input").each(function (index) {
    $(this).attr("index", index);
  });
  
  // var inputID = $("input[index='" + index + "']").attr("id");
  $("label:not(label[for='name'])").hide();

  //input 자동완성 기능 off
  $("input").attr("autocomplete", "off");
  
  //핸드폰 번호 keyup시 자동 하이픈 생성
  $("#phone").on("keyup",function (e) {
    e = e || window.e;
    var data = $(this).val().trim();
    this.value = autoHypen(data);
  });

  // 허용된 다른 text 입력 방지
  $("#name").on("keyup", function () {
      chk_input_filter("name", "#name");
  });
  $("#email").on("keyup", function () {
      chk_input_filter("email", "#email");
  });
  $("#email_Domain").on("keyup", function () {
      chk_input_filter("email", "#email_Domain");
  });
  $("#SSN").on("keyup", function () {
      chk_input_filter("number", "#SSN");
  });
  $("#SSN_back").on("keyup", function () {
      chk_input_filter("number", "#SSN_back");
  });

  $("#asset").on("keyup", function () {
      chk_input_filter("number", "#asset");
  });

  //이름 input 유효성 test
  $("#name").keypress(function (e) { 
    var Namevalue = $("#name").val();
    if (e.keyCode == 13) {

      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = $("input[index='" + index + "']").attr("id");
      var inputID = $("input[index='" + (index + 1) + "']").attr("id");

      if (isName(Namevalue)) {
        next(inputID, nextInput) 
        pass(labelID, index);
      } else {
        error(index,labelID,namemsg)
      }
    }
  });

  //이름 input value null 일때 에러메세지 제거
  $("#name").on("propertychange change keyup paste input", function () {
    var Namevalue = $("#name").val();
    var index = $(this).attr("index");
    var labelID = $("input[index='" + index + "']").attr("id");
        if (Namevalue == "" || Namevalue == null) {
      pass(labelID,index);
    }
  })

  //이름 input foucus out 시 유효성 test
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
      next(inputID, nextInput);
      pass(labelID, index);
      } else {
      error(index, labelID, namemsg);
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
        $("span." + inputID + "").show();
        $("input[index='" + (index + 2) + "']").show();
        next(inputID, nextInput) 
        pass(labelID, index);
        
      } else {
        error(index, labelID,phonemsg);
      }
    }
  })
 
  //Enter시 이메일 ID 유효성
  $("#email").keypress(function (e) {
    var IDvalue = $("#email").val();
    if (e.keyCode == 13) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = "email";
     
      console.log(isEmailID(IDvalue))
      if (isEmailID(IDvalue)) {
        nextInput.focus();
        pass(labelID, index);

      } else {
        is_emailID = 0;
        error(index, labelID,emailmsg);
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
      var inputID = $("input[index='" + (index + 1) + "']").attr("id");
      var labelID = "email";
     
      console.log(labelID);

      console.log(isDomain(DOMAINvalue))
      if (isDomain(DOMAINvalue)) {
        $("span." + inputID + "").show();
        $("input[index='" + (index + 2) + "']").show();
        next(inputID, nextInput) 
        pass(labelID, index);

      } else {
        error(index, labelID, domainmsg );
      }
    }
  });

  //Enter시 주민등록번호 유효성 - 앞
  $("#SSN").on("keyup",function () {
    var frontvalue = $("#SSN").val();
    if (frontvalue.length >= 6) {
      // 입련한 input의 index값
      var index = $(this).attr("index");
      //문자열 숫자로 반환
      index = Number(index);
      //다음 input 찾기
      var nextInput = $("input[index='" + (index + 1) + "']");
      var labelID = "SSN";

      console.log(isSSN(frontvalue))
      if (isSSN(frontvalue)) {
        $("#SSN_back").removeAttr("disabled");
        nextInput.focus();  
        pass(labelID, index);

      } else {
        error(index, labelID, SSNfront);
        
      }
      
    }

  //     if ($("#SSN").val().length >= 6) {
  //   console.log($("#SSN").val().str(0, 6));
  //   // $("#SSN").val($("#SSN").str(0, 6));
  // }
  });

  // $("#SSN_front").change(function () {
    
  // });



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
      var labelID = "SSN"
     
      console.log(isSSNback(backvalue))
      if (isSSNback(backvalue)) {
        $("p." + inputID + "").show();
        $("input[index='" + (index + 2) + "']").show();
        next(inputID, nextInput) 
        pass(labelID, index);

      } else {
        error(index, labelID, SSNback);
        
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

  // $("#btn_join").click(function () {
  //   alert("회원가입 성공");
  // })
  
  
  $("#btn_join").click(function () {
    var Namevalue = $("#name").val();
    // 입련한 input의 index값
    var index = $("#name").attr("index");
    //문자열 숫자로 반환
    index = Number(index);
    //다음 input 찾기
    var labelID = $("input[index='" + index + "']").attr("id");("id");
    
    if (isName(Namevalue)) {
      is_name = 1;
      pass(labelID, index);
    } else {
      is_name = 0;
      error(index, labelID, namemsg);
    }

    if (is_name == 1) {
      alert("회원가입 성공");
      $("#btn_join").submit();
    }
  })

  
    
  // var value = 10000;
  // console.log(change(value));
  
});

