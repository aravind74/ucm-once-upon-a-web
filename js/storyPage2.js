// js/page2.js
$(document).ready(function () {
  var PAGE_ID = 2;
  let attempts = 0;

  // 1) Load story for page 2
  loadStoryPage(PAGE_ID, function (page) {
    if (!page) return;

    $("#story-heading-2").text(page.heading || "Page 2");

    var $storyText = $("#story-text-2");
    $storyText.empty();

    if (Array.isArray(page.text)) {
      page.text.forEach(function (line) {
        $("<p>").text(line).appendTo($storyText);
      });
    }
  });

  // 2) Load activity for page 2 (checkbox)
  loadActivityForPage(PAGE_ID, function (activity) {
    if (!activity) return;

    $("#activity-prompt-2").text(activity.prompt || "");

    var $container = $("#activity-options-2");
    $container.empty();

    if (activity.type === "checkbox") {
      activity.options.forEach(function (opt, index) {
        var id = "p2-opt-" + index;

        var $label = $("<label>")
          .attr("for", id)
          .addClass("option-label")
          .text(opt);

        var $input = $("<input>")
          .attr("type", "checkbox")
          .attr("id", id)
          .attr("value", index);

        var $wrap = $("<div>").addClass("option-row");
        $wrap.append($input).append($label);
        $container.append($wrap);
      });

      $("#check-answer-2").on("click", function () {
        var mode = getReaderMode();
        var $feedback = $("#activity-feedback-2");

        var selectedIndexes = [];
        $("#activity-options-2 input:checked").each(function () {
          selectedIndexes.push(parseInt($(this).val(), 10));
        });

        if (selectedIndexes.length === 0) {
          setFeedback($feedback, "Choose at least one sound!", null);
          return;
        }

        var correct = (activity.correctIndexes || []).slice().sort().join(",");
        var chosen = selectedIndexes.slice().sort().join(",");

        if (correct === chosen) {
          setFeedback($feedback, "Perfect! You picked all the forest sounds. 🌟", true);
        } else {
          if (mode === "guided") {
            setFeedback(
              $feedback,
              "Hint: Think about sounds you usually hear in a quiet forest, not in a busy city. 😊",
              false
            );
          } else if (mode === "normal") {
            setFeedback($feedback, "Not quite, try again!", false);
          } else if (mode === "challenge") {
            attempts++;

            if (attempts >= 2) {
              $("#check-answer-2").prop("disabled", true);
              setFeedback($feedback, "No more attempts in Challenge Mode.", false);
            } else {
              setFeedback($feedback, "Incorrect. One last try!", false);
              $("#check-answer-2").prop("disabled", true);

              setTimeout(function () {
                $("#check-answer-2").prop("disabled", false);
              }, 5000);
            }
          }
        }
      });
    }
  });
});
