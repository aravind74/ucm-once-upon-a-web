//storyPage1.js
//Created by Aravind Sajeev Kumar
$(document).ready(function () {
  var PAGE_ID = 1;

  // 1) Load story text
  loadStoryPage(PAGE_ID, function (page) {
    if (!page) return;

    $("#story-heading-1").text(page.heading || "Page 1");

    var $storyText = $("#story-text-1");
    $storyText.empty();
    if (Array.isArray(page.text)) {
      page.text.forEach(function (line) {
        $("<p>").text(line).appendTo($storyText);
      });
    }
  }); //loadStoryPage()

  // 2) Load activity
  loadActivityForPage(PAGE_ID, function (activity) {
    if (!activity) return;

    $("#activity-prompt-1").text(activity.prompt || "");

    var $optionsContainer = $("#activity-options-1");
    $optionsContainer.empty();

    if (activity.type === "radio" && Array.isArray(activity.options)) {
      activity.options.forEach(function (optionText, index) {
        var id = "q1-option-" + index;

        var $label = $("<label>")
          .attr("for", id)
          .addClass("option-label")
          .text(optionText);

        var $input = $("<input>")
          .attr("type", "radio")
          .attr("name", "q1")
          .attr("id", id)
          .val(index);

        var $wrapper = $("<div>").addClass("option-row");
        $wrapper.append($input).append($label);
        $optionsContainer.append($wrapper);
      });

      let attempts = 0;
      const $checkBtn = $("#check-answer-1");
      const $feedback = $("#activity-feedback-1");

      function disableActivityPermanently() {
        $checkBtn.prop("disabled", true).addClass("btn-disabled");
        $("input[name='q1']").prop("disabled", true);
      } //disableActivityPermanently()

      $checkBtn.on("click", function () {
        var mode = getReaderMode();
        var selectedVal = $("input[name='q1']:checked").val();

        if (selectedVal === undefined) {
          setFeedback($feedback, "Please pick an answer first.", null);
          return;
        }

        var selectedIndex = parseInt(selectedVal, 10);

        if (selectedIndex === activity.correctIndex) {
          // Correct answer: feedback, award star, then disable button + options
          setFeedback($feedback, "Great job! That's correct. 🌟", true);
          awardStarForPage(PAGE_ID);
          disableActivityPermanently();
          return;
        }

        // Wrong answer — behavior depends on mode
        switch (mode) {
          case "guided":
            setFeedback(
              $feedback,
              "Hint: Luna noticed something missing in the sky. Try again! 😊",
              false
            );
            break;

          case "normal":
            setFeedback($feedback, "Not quite, try again!", false);
            break;

          case "challenge":
            attempts++;

            if (attempts >= 2) {
              // Out of chances in challenge mode: disable permanently
              setFeedback($feedback, "No more attempts in Challenge Mode.", false);
              disableActivityPermanently();
            } else {
              // First wrong attempt in challenge: temporary lockout
              setFeedback($feedback, "Incorrect. One last try! Take 5 seconds to think before you answer.", false);
              $checkBtn.prop("disabled", true).addClass("btn-disabled");
              //Time-out for 5 seconds
              setTimeout(function () {
                $checkBtn.prop("disabled", false).removeClass("btn-disabled");
              }, 5000);
            }
            break;
        }
      });
    }
  }); //loadActivityForPage()
});
