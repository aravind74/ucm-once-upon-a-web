// js/page1.js
$(document).ready(function () {
  var PAGE_ID = 1;

  // 1) Load story text
  loadStoryPage(PAGE_ID, function (page) {
    if (!page) return;

    // Heading
    $("#story-heading-1").text(page.heading || "Page 1");

    // Story paragraphs
    var $storyText = $("#story-text-1");
    $storyText.empty();
    if (Array.isArray(page.text)) {
      page.text.forEach(function (line) {
        $("<p>").text(line).appendTo($storyText);
      });
    }
  });

  // 2) Load activity
  loadActivityForPage(PAGE_ID, function (activity) {
    if (!activity) return;

    $("#activity-prompt-1").text(activity.prompt || "");

    var $optionsContainer = $("#activity-options-1");
    $optionsContainer.empty();

    // Only handling "radio" type here (for page 1)
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
      $("#check-answer-1").on("click", function () {
        var mode = getReaderMode();
        var selectedVal = $("input[name='q1']:checked").val();
        var $feedback = $("#activity-feedback-1");

        if (selectedVal === undefined) {
          setFeedback($feedback, "Please pick an answer first.", null);
          return;
        }

        var selectedIndex = parseInt(selectedVal, 10);

        if (selectedIndex === activity.correctIndex) {
          setFeedback($feedback, "Great job! That's correct. 🌟", true);
        } else {
          // Different behavior depending on mode
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
                $("#check-answer-1").prop("disabled", true);
                setFeedback($feedback, "No more attempts in Challenge Mode.", false);
              }
              else {
                setFeedback($feedback, "Incorrect. One last try!", false);
                $("#check-answer-1").prop("disabled", true);

                setTimeout(function () {
                  $("#check-answer-1").prop("disabled", false);
                }, 5000);
              }
              break;
          }
        }
      });

    }
  });
});
