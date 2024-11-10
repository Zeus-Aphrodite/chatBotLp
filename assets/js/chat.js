/**
 * 初期表示処理
 */
// 各質問項目にdata-secパラメータを付与（関数上で何問目か認識する用）
const urlParams = new URLSearchParams(window.location.search);
const myParamListing = urlParams.get("listing");
var positionG = 0;
var prefectureCode = 9;
var submitted = false;
var timeShowAnswer = 1500;

$(".question_sec").each(function (i) {
  $(this).attr("data-sec", i + 1);
});

// 1問目を表示
$(window).on("load", function () {
  display_text($("#start_question").find(".question"), 1000); // 吹き出し表示
  $("#start_question").find(".ans_input").animate({ opacity: "1" }, 300);
  var position = $("#start_question").offset().top - 150; // スクロール
  $("html,body").animate(
    {
      scrollTop: position,
    },
    600
  );
});

function activeBtn() {
  if ($(".chat01").length > 0) {
    if (
      $("#form-input-name").val() != "" &&
      $("#form-input-phone").val() != "" &&
      validatePhoneNumber($("#form-input-phone").val())
    ) {
      if (!$("button.cv_entry").hasClass("active")) {
        $("button.cv_entry").addClass("active");
        $("button.cv_entry").prop("disabled", false);
      }
    } else {
      if ($("button.cv_entry").hasClass("active")) {
        $("button.cv_entry").removeClass("active");
        $("button.cv_entry").prop("disabled", true);
      }
    }
  } else {
    if (
      $("#form-input-phone").val() != "" &&
      validatePhoneNumber($("#form-input-phone").val())
    ) {
      if (!$("button.cv_entry").hasClass("active")) {
        $("button.cv_entry").addClass("active");
        $("button.cv_entry").prop("disabled", false);
      }
    } else {
      if ($("button.cv_entry").hasClass("active")) {
        $("button.cv_entry").removeClass("active");
        $("button.cv_entry").prop("disabled", true);
      }
    }
  }
}

// 回答入力時、input_answerを発動
$(".form-input").on("change", function () {
  
  setTimeout(input_answer, 400, $(this));

});
$("#form-input-phone").on("input", function () {
  activeBtn();
});
$("#form-input-name").on("input", function () {
  activeBtn();
});

/**
 * 関数
 */
// 文字表示処理 start
function display_text(element, wait) {
  setTimeout(function () {
    element.find(".message-pop").hide();
    element.find("p").fadeIn();
    setTimeout(function () {
      element.find(".readed").css("display", "block");
    }, 700);
  }, wait);
}

// 文字表示処理 end

// 入力値を吹き出しに入れる start
function input_to_balloon(element, target_element) {
  if (element.prop("tagName") == "SELECT") {
    var txt = $(element).find(":selected").text();
    target_element.text(txt);
  } else {
    if (element.attr("type") == "radio") {
      var id = element.attr("id");
      var answer_label = $("[for=" + id + "]").find("p");
      target_element.text(answer_label.text());
    } else {
      if (element.hasClass("searchCity__itemInner")) {
        target_element.text(
          element.find(".searchCity__itemText").text()
        );
      } else {
        target_element.text(element.val());
      }
    }
  }
}

function addTextBeforeAnwser(data) {
  return ["はい", "いいえ"].includes(data) ? "" : "です。";
}

// 入力値を吹き出しに入れる end

// 入力値を吹き出しに入れる処理 start
function input_answer(element) {
  // 各値取得
 
 
  var queston_answer = element.closest(".question_sec"); //質問・回答欄全て
  var answer_input = element.closest(".ans_input"); //回答中の入力欄
  var answer_balloon = queston_answer.find(".ans_display"); //回答吹き出し欄
  var multipleAnswer = false;
  if (queston_answer.find(".insert_answer").length > 1) {
    multipleAnswer = true;
    positionG = queston_answer
      .find(".ans_input")
      .index(element.closest(".ans_input"));
    answer_balloon = answer_balloon.eq(positionG);
  }


  // show step 1
  if (element.attr("name") == 'data[building_type_id]') {
    if (element.attr("type") == "radio") {
      if (element.val() == 2) {
        $("#building_type_id").removeClass("no_display");
        element.closest(".answer").remove();
        return;
      } else {
        $("#building_type_id")
          .find(".insert_answer")
          .removeClass("insert_answer");
        $(".replace-question .man_txt p").text(
          $(".replace-question .man_txt p")
            .text()
            .replace("replace", element.attr("data-value"))
        );
      }
    } else {
      $(".replace-question .man_txt p").text(
        $(".replace-question .man_txt p")
          .text()
          .replace(
            "replace",
            $(element).find(`[value='${element.val()}']`).text()
          )
      );
    }
  }
  // show step 2
  if (element.attr("name") == "data[buildings_prefecture]") {
    element.closest(".answer").remove();
    $('div[name="' + element.attr("id") + '"]')
      .closest(".answer")
      .removeClass("no_display");
    $('div[name="' + element.attr("id") + '"]').removeClass("no_display");
    return;
  }
  // get id of step 2.1
  if (element.attr("name") == "data[prefecture_code]") {
    prefectureCode = parseInt(element.data('name'));
    getCities();
  }
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("question") && searchParams.get("question") == 1) {
    // show step 3
    if (element.attr("name") == "work_id") {
      var workIdValue = $("input[name=work_id]:checked").val();
      if (workIdValue == 1) {
        $(".position-4").remove();
      }
      if (workIdValue == 2) {
        $(".position-4").after($(".position-3"));
        $(".position-2").remove();
      }
    }
    // show step 24
    if (element.attr("name") == "any_planting_around") {
      if ($("input[name=work_id]:checked").val() == 1) {
        $(".position-4").remove();
      }
      setTimeout(function () {
        element.parents(".question_sec").find(".thanks").show();
      }, 1400);
    }
    // show step 19
    if (element.attr("name") == "peeling") {
      setTimeout(function () {
        $(".conclude").show();
      }, 1500);
      if (
        element.val() == 3 &&
        $("input[name=fading_outer_wall]:checked").val() == 3 &&
        $("input[name=mold_or_moss]:checked").val() == 3 &&
        $("input[name=choking]:checked").val() == 3 &&
        $("input[name=hair_rack]:checked").val() == 3
      ) {
        $(".conclude-no").removeClass("no_display");
        $(".conclude-yes").addClass("no_display");
      }
    }
    // show step 4
    if (element.attr("name") == "work_id_outwall") {
      if ([3, 4].includes(parseInt(element.val()))) {
        $(".paint, #paint").remove();
        $(".material_wall, #material_wall").remove();
      } else {
        // is paint
        if (element.val() == 1) {
          $(".material_wall, #material_wall").remove();
        }
        // is material wall
        if (element.val() == 2) {
          $(".paint, #paint").remove();
        }
      }
    }
    // show step 4.1
    if (element.attr("name") == "paint") {
      // is paint
      $(".paint:not(#paint-" + element.val() + ")").remove();
      // 決まっていない
      if (parseInt(element.val()) != 6) {
        $(".position-3").remove();
      }
    }
    // show step 4.1.1
    if (
      element.attr("name") == "paint_more" ||
      element.attr("name") == "material_wall_more"
    ) {
      // 決まっていない
      if (parseInt(element.val()) != 4) {
        $(".position-3").remove();
      }
    }
    if (element.attr("name") == "material_wall") {
      // is paint
      $(
        ".material_wall:not(#material_wall-" + element.val() + ")"
      ).remove();
      if (parseInt(element.val()) == 4) {
        setTimeout(function () {
          $("#material_wall-4")
            .find(".answer")
            .removeClass("hidden-form");
        }, 1400);
        $(".position-3").remove();
      }
    }

    if (element.attr("name") == "leaks") {
      setTimeout(function () {
        element.parents(".question_sec").find(".thanks").show();
      }, 1400);
    }

    if (
      element.attr("name") == "data[work_id_roof]" &&
      ![3, 4].includes(parseInt(element.val())) &&
      $("input[name=work_id]:checked").val() == 2
    ) {
      $(".position-2").remove();
      $(".position-3").remove();
    }
  } else {
    // show step 3
    if (element.attr("name") == "data[work_id]") {
      let value = element.attr("data");
      if (value == 2) {
        $("#exterior_wall_material").remove();
        $("#work_id_outwall").remove();
      }
      if (value == 1) {
        $("#roofing_material").remove();
        $("#work_id_roof").remove();
      }
    }
  }
  timeShowAnswer = element.attr("name") === "data[study_status]" ? 1500 : 2500;
  // show step 6
  if (
    element.attr("name") == "data[rough_square_id]" &&
    element.attr("type") == "radio"
  ) {
    if (element.val() == 0) {
      element.closest(".answer").remove();
      $("#rough_square_id").removeClass("no_display");
      return;
    } else {
      $("#rough_square_id")
        .find(".insert_answer")
        .removeClass("insert_answer");
    }
  }
  // step searchCity__itemInner
  if (element.hasClass("searchCity__itemInner")) {
    $("input[name=city_name]").val(
      element.find(".searchCity__itemText").text()
    );
    $("input[name=city_code]").val(element.attr("data-name"));
  }

  if (multipleAnswer) {
    input_to_balloon(
      element,
      queston_answer.find(".insert_answer").eq(positionG)
    );
  } else {
    input_to_balloon(element, queston_answer.find(".insert_answer"));
  }
  // 現在の回答入力欄を非表示・吹き出しを表示する
  if (myParamListing == 1) {
    checkPhoneNumber();
  }
  if (
    element.attr("name") != "data[name]" &&
    element.attr("name") != "data[phone]" &&
    element.attr("name") != "data[study_status]"
  ) {
    answer_balloon.removeClass("no_display");
    answer_input.addClass("no_display");
    display_text(answer_balloon, 1000);
  }
  if(element.hasClass('searchCity__listItem')) {
    let tmpResult = element.find('.searchCity__itemInner').attr("data-name");
    console.log('tmpResult',tmpResult);
    
    answer_balloon.find(".insert_answer").text(tmpResult)
  }
  display_newer();

}
// 入力値を吹き出しに入れる処理 end

// 最新の質問またはCVボタンを表示する start
function display_newer() {
  // 質問欄が回答されているか確認
  var all_answer_count = 0; //回答済みフラグ

  $(".question_sec").each(function (i) {
    // 回答用の吹き出し内のテキストがあるか確認
    var count = 0;
    var answers = $(this).find(".insert_answer");
    answers.each(function () {
      if ($(this).text()) {
        count += 1;
      }
    });

    // 回答済み（吹き出しの数 = テキスト入力済みの吹き出しの数）の時
    if (answers.length == count) {
      if ($(this).hasClass("no_display")) {
        $(this).removeClass("no_display");
      }
      all_answer_count += 1;
    } else {
      var self = $(this);
      var time = 200;
        if (self.hasClass('show-inform')) {
            let timeShowInform = 1000;
            if ($('form').hasClass('chat04')) {
                timeShowInform = 1500;
                timeShowAnswer += 500;
            } else {
                timeShowAnswer = 500;
        }
        setTimeout(function () {
	  	  $('#msg-inform').removeClass("no_display");
		}, timeShowInform);
      }

      display_text(self.find(".question"), 1000);
      if ($("input[name=question").length) {
        var total =
          self.find(".illustration").length +
          self.find(".cmt").length;
        if (total > 0) {
          total++;
        }
        var count = 1;
        self.find(".illustration").each(function (k) {
          setTimeout(function () {
            self.find(".illustration").eq(k).show();
          }, 1000 * count);
          count++;
        });

        self.find(".cmt").each(function (j) {
          setTimeout(function () {
            self.find(".cmt")
              .eq(j)
              .parents(".hidden-form")
              .removeClass("hidden-form");
          }, 1000 * count);
          count++;
        });

        setTimeout(function () {
          self.find(".question.hidden-form").removeClass(
            "hidden-form"
          );
        }, 1000 * total);
        setTimeout(function () {
          self.find(".answer.hidden-form").removeClass("hidden-form");
        }, 1000 * (total + 0.5));
        time = 1000 * (total / 2);
      }

      setTimeout(function () {
        self.removeClass("no_display");
        // 回答入力欄を表示
        self.find(".ans_input").animate({ opacity: "1" }, 300);
        // 回答欄へスクロール
        var tagQuestion = $(".question_sec").eq(i).find(".question");
        var next_position = tagQuestion.offset().top - "20";
        if (self.find("#searchCity").length) {
          setTimeout(function () {
            self.find("div.answer").removeClass("no_display");
          }, 3000);
        } else {
          setTimeout(function () {
            $("html,body").animate(
              {
                scrollTop: next_position,
              },
              600
            );
          }, time);
        }
      }, timeShowAnswer);
      if ($(this).hasClass("last-question")) {
        setTimeout(function () {
          $(".item_tel").removeClass("no_display");
          $(".cv_entry").removeClass("no_display");
        }, timeShowAnswer);
        if ($('#msg-done').length) {
          setTimeout(function () {
            $('.group-loading').hide();
            $('#msg-done').removeClass('no_display');
          }, 15000);
        } else {
          $('.group-loading').hide();
        }
      }
      return false;
    }

    if ($(".question_sec").length == all_answer_count) {
      if (myParamListing == 1 && $("#form-input-phone").val() != null) {
        checkPhoneNumber($("#form-input-phone").val());
      }
      var position = $(".cv_entry").offset().top - 100;
      $("html,body").animate(
        {
          scrollTop: position,
        },
        600
      );
    } else if (
      myParamListing == 1 &&
      all_answer_count == $(".question_sec").length - 1
    ) {
      $(".submit").prop("disabled", false);
    } else {
      $(".submit").prop("disabled", true);
    }
  });
}

// 最新の質問またはCVボタンを表示する end
function validatePhoneNumber(phone) {
  var pattern = /^(\d{2}|0[5789]0)[\s.-]?[1-9]\d{3}[\s.-]?\d{4}$/; //2-4-4
  var pattern2 = /^(\d{3}|0[5789]0)[\s.-]?[1-9]\d{3}[\s.-]?\d{4}$/; //3-4-4
  var pattern3 = /^(\d{3}|0[5789]0)[\s.-]?[1-9]\d{2}[\s.-]?\d{4}$/; //3-3-4
  if (
    phone.match(pattern) ||
    phone.match(pattern2) ||
    phone.match(pattern3)
  ) {
    return true;
  }
  return false;
}

// submit時電話番号チェック start
function submitForm() {
  var phonenum = $("#form-input-phone").val();
  var email = $("#form-input-name").val();

  //電話番号チェック
  if (phonenum != "" && phonenum != "") {
    // Check phone number
    $(".phoneErrMsg").text("");
    $("#form-input-phone").removeClass("has-error");
    $(".mailErrMsg").text("");
    $("#form-input-name").removeClass("has-error");
    $(".cv_entry").prop("disabled", true);
    $.ajax({
      async: false,
      type: "post",
      url: "/thanks.htm",
      data: {
        phone: phonenum,
        email: email,
        onlyMailPhone: true,
      },
      success: function (response) {
        var data = JSON.parse(response);
        if (data.result == "error") {
          if (data.msg.email) {
            $(".mailErrMsg").text(data.msg.email[0]);
            $("#form-input-name").addClass("has-error");
          }
          if (data.msg.phone) {
            $(".phoneErrMsg").text(data.msg.phone[0]);
            $("#form-input-phone").addClass("has-error");
          }
          $(".cv_entry").prop("disabled", false);
        } else if (data.result == "success") {
          $(".phoneErrMsg").text("");
          $(".mailErrMsg").text("");
          submitted = true;
          document.getElementById("formStoreChat").submit();
        }
      },
      error: function () {
        // alert("An error has occurred!");
      },
    });
    return false;
  } else {
    $(".phoneErrMsg").text("正しい電話番号を入力してください");
    return false;
  }
}

// submit時電話番号チェック end

$(function () {
  $(".cv_entry").on("click", function () {
    submitted = true;
  });
  $("#modal-terms").on("hide.bs.modal", function (e) {
    window.history.back();
  });
  $("#modal-privacy").on("hide.bs.modal", function (e) {
    window.history.back();
  });
  window.addEventListener("beforeunload", function (e) {
    if (!submitted) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
  $(".modalchat .close").on("click", function () {
    $(".modalchat").hide();
  });
  const modalTitmeout = urlParams.get("modalchat") == 1 ? 6000 : 3000;
  // hide modal after 3s
  setTimeout(function () {
    $(".modalchat").hide();
  }, modalTitmeout);

  setElementCenter($(".modal-info"));
  window.onresize = function () {
    setElementCenter($(".modal-info"));
  };
});

function getCities() {
  console.log("this is getCities");
  
  $.ajax({
    async: false,
    type: "post",
    url: "/thanks.htm",
    data: {
      code: prefectureCode,
    },
    success: function (response) {
      var data = JSON.parse(response);
      if (data.result == "success") {
        let tag = "";
        let grouped = data.content.reduce(
          function (acc, currentValue, currentIndex) {
            if (
              acc.hasOwnProperty(currentValue.furigana.charAt(0))
            ) {
              acc[currentValue.furigana.charAt(0)].push(
                currentValue
              );
            } else {
              acc[currentValue.furigana.charAt(0)] = [
                currentValue,
              ];
            }
            return acc;
          },
          {
            special: [],
          }
        );
        const keys = Object.keys(grouped).sort();
        for (const key of keys) {
          if (key != "special") {
            tag += `<li class="searchCity__listItem">
                      <div class="searchCity__itemInner searchCity__itemInner--kana"><span>${key}</span></div>
                    </li>`;
            grouped[key].forEach((object) => {
              tag += `<li class="searchCity__listItem item">
                        <div class="searchCity__itemInner js-citySelect-trigger" data-id="${object.code}" data-name="${object.name}">
                          <div class="searchCity__itemText">${object.name}</div>
                        </div>
                      </li>`;
            });
          }
        }

        let template =
          '<ul class="searchCity__list js-citySelect-append-target">' +
          tag +
          "</ul>";
        $("#searchCity").append(template);
        $(".searchCity__itemInner").on("click", function () {
          setTimeout(input_answer, 400, $(this));
        });
      }
    },
    error: function (error) {
      // console.log(error);
      // alert("An error has occurred!");
    },
  });
}
$('.searchCity__listItem').click(function(){
  console.log("searchCity item clicked");
  input_answer($(this))
  
})
function setElementCenter(element) {
  element.css(
    "top",
    Math.max(0, ($(window).height() - element.outerHeight()) / 2) + "px"
  );
  element.css(
    "left",
    Math.max(0, ($(window).width() - element.outerWidth()) / 2) + "px"
  );
}
