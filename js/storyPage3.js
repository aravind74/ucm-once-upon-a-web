// js/page3.js
$(document).ready(function () {
  var PAGE_ID = 3;
  let attempts = 0;

  // 1) Load story for page 3
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

  // 2) Load activity for page 3 (select)
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

      $("#check-answer-3").on("click", function () {
        var mode = getReaderMode();
        var $feedback = $("#activity-feedback-3");
        var selectedVal = $select.val();

        if (selectedVal === "") {
          setFeedback($feedback, "Please select an answer first.", null);
          return;
        }

        var selectedIndex = parseInt(selectedVal, 10);

        if (selectedIndex === activity.correctIndex) {
          setFeedback(
            $feedback,
            "Correct! Oliver the owl helped Luna. 🌟",
            true
          );
        } else {
          if (mode === "guided") {
            setFeedback(
              $feedback,
              "Hint: Who was sitting high up in the tree, giving directions? 😊",
              false
            );
          } else if (mode === "normal") {
            setFeedback($feedback, "Not quite, try again!", false);
          } else if (mode === "challenge") {
            attempts++;

            if (attempts >= 2) {
              $("#check-answer-3").prop("disabled", true);
              setFeedback($feedback, "No more attempts in Challenge Mode.", false);
            } else {
              setFeedback($feedback, "Incorrect. One last try!", false);
              $("#check-answer-3").prop("disabled", true);

              setTimeout(function () {
                $("#check-answer-3").prop("disabled", false);
              }, 5000);
            }
          }
        }
      });
    }
  });
});
