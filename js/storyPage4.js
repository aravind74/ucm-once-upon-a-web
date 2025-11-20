// js/page4.js
$(document).ready(function () {
    var PAGE_ID = 4;
    let attempts = 0;
  
    // 1) Load story for page 4
    loadStoryPage(PAGE_ID, function (page) {
      if (!page) return;
  
      $("#story-heading-4").text(page.heading || "Page 4");
  
      var $storyText = $("#story-text-4");
      $storyText.empty();
  
      if (Array.isArray(page.text)) {
        page.text.forEach(function (line) {
          $("<p>").text(line).appendTo($storyText);
        });
      }
    });
  
    // 2) Load activity for page 4 (emoji radios)
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-4").text(activity.prompt || "");
  
      var $container = $("#activity-options-4");
      $container.empty();
  
      if (activity.type === "emoji" && Array.isArray(activity.options)) {
        activity.options.forEach(function (emoji, index) {
          var id = "p4-emoji-" + index;
  
          var $input = $("<input>")
            .attr("type", "radio")
            .attr("name", "p4-emoji")
            .attr("id", id)
            .val(index);
  
          var $label = $("<label>")
            .attr("for", id)
            .addClass("option-label")
            .text(emoji);
  
          var $wrap = $("<div>").addClass("option-row");
          $wrap.append($input).append($label);
          $container.append($wrap);
        });
  
        $("#check-answer-4").on("click", function () {
          var mode = getReaderMode();
          var $feedback = $("#activity-feedback-4");
          var selectedVal = $("input[name='p4-emoji']:checked").val();
  
          if (selectedVal === undefined) {
            setFeedback($feedback, "Please choose an emoji first.", null);
            return;
          }
  
          var selectedIndex = parseInt(selectedVal, 10);
  
          if (selectedIndex === activity.correctIndex) {
            setFeedback(
              $feedback,
              "Nice! Luna feels happy and brave crossing the river. 🌟",
              true
            );
          } else {
            if (mode === "guided") {
              setFeedback(
                $feedback,
                "Hint: She’s being very brave while crossing, not scared. 😊",
                false
              );
            } else if (mode === "normal") {
              setFeedback($feedback, "Not quite, try again!", false);
            } else if (mode === "challenge") {
              attempts++;
  
              if (attempts >= 2) {
                $("#check-answer-4").prop("disabled", true);
                setFeedback($feedback, "No more attempts in Challenge Mode.", false);
              } else {
                setFeedback($feedback, "Incorrect. One last try!", false);
                $("#check-answer-4").prop("disabled", true);
  
                setTimeout(function () {
                  $("#check-answer-4").prop("disabled", false);
                }, 5000);
              }
            }
          }
        });
      }
    });
  });
  