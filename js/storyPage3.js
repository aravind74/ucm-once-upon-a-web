//storyPage3.js
//Created by Aravind Sajeev Kumar
$(document).ready(function () {
  var PAGE_ID = 3;
  let attempts = 0;

  // 1) Load story
  loadStoryPage(PAGE_ID, function (page) {
    if (!page) return;

    $("#story-heading-3").text(page.heading || "Page 3");

    var $storyText = $("#story-text-3");
    $storyText.empty();

    if (Array.isArray(page.text)) {
      page.text.forEach(function (line) {
        $("<p>").text(line).appendTo($storyText);
      });
    }
  });

  // 2) Load activity (dropdown)
  loadActivityForPage(PAGE_ID, function (activity) {
    if (!activity) return;

    $("#activity-prompt-3").text(activity.prompt || "");

    var $select = $("#activity-select-3");
    $select.find("option:not(:first)").remove(); // keep placeholder

    if (activity.type === "select" && Array.isArray(activity.options)) {
      activity.options.forEach(function (optText, index) {
        $("<option>")
          .val(index)
          .text(optText)
          .appendTo($select);
      });

      const $checkBtn = $("#check-answer-3");
      const $feedback = $("#activity-feedback-3");

      function disableActivityPermanently() {
        $checkBtn.prop("disabled", true).addClass("btn-disabled");
        $select.prop("disabled", true);
      }

      $checkBtn.on("click", function () {
        var mode = getReaderMode();
        var selectedVal = $select.val();

        if (selectedVal === "") {
          setFeedback($feedback, "Please select an answer first.", null);
          return;
        }

        var selectedIndex = parseInt(selectedVal, 10);

        if (selectedIndex === activity.correctIndex) {
          setFeedback($feedback, "Correct! Oliver the owl helped Luna. 🌟", true);
          awardStarForPage(PAGE_ID);
          disableActivityPermanently();
          return;
        }

        switch (mode) {
          case "guided":
            setFeedback(
              $feedback,
              "Hint: Who was sitting high up in the tree, giving directions? 😊",
              false
            );
            break;

          case "normal":
            setFeedback($feedback, "Not quite, try again!", false);
            break;

          case "challenge":
            attempts++;
            if (attempts >= 2) {
              setFeedback($feedback, "No more attempts in Challenge Mode.", false);
              disableActivityPermanently();
            } else {
              setFeedback($feedback, "Incorrect. One last try! Take 5 seconds to think before you answer.", false);

              $checkBtn.prop("disabled", true).addClass("btn-disabled");

              setTimeout(function () {
                $checkBtn.prop("disabled", false).removeClass("btn-disabled");
              }, 5000);
            }
            break;
        }
      });
    }
  });
});
