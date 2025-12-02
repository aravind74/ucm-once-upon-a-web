//storyPage4.js
//Created by Aravind Sajeev Kumar
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
  
    // 2) Load activity for page 4 (fill in the blank, simple text input)
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-4").text(activity.prompt || "Fill in the missing word.");
  
      var $container = $("#activity-options-4");
      $container.empty();
  
      if (activity.type !== "fill") {
        // If JSON type doesn't match, don't try to render
        return;
      }
  
      var sentenceText =
        activity.sentence || "Luna stepped carefully on the _________ stones.";
      var correctAnswer = (activity.answer || "")
        .toLowerCase()
        .trim();
  
      // Show the sentence
      var $sentence = $("<p>")
        .addClass("fill-sentence")
        .text(sentenceText);
      $container.append($sentence);
  
      // Simple text input
      var $input = $("<input>")
        .attr("type", "text")
        .attr("id", "activity-input-4")
        .attr("autocomplete", "off")
        .addClass("section-control")
        .attr("placeholder", "Type the missing word here");
      $container.append($input);
  
      const $checkBtn = $("#check-answer-4");
      const $feedback = $("#activity-feedback-4");
  
      function disableActivityPermanently() {
        $checkBtn.prop("disabled", true);
        $input.prop("disabled", true);
      }
  
      $checkBtn.on("click", function () {
        var mode = getReaderMode();
        var userAnswer = ($input.val() || "")
          .toLowerCase()
          .trim();
  
        if (!userAnswer) {
          setFeedback(
            $feedback,
            "Please type the missing word before checking.",
            null
          );
          return;
        }
  
        if (correctAnswer && userAnswer === correctAnswer) {
          setFeedback(
            $feedback,
            "Great job! Luna crossed using the stepping stones. 🌟",
            true
          );
          awardStarForPage(PAGE_ID);
          disableActivityPermanently();
          return;
        }

        if (mode === "guided") {
          setFeedback(
            $feedback,
            "Hint: Look at what Luna is standing on in the picture. It’s a kind of stone. 😊",
            false
          );
        } else if (mode === "normal") {
          setFeedback($feedback, "Not quite, try again!", false);
        } else if (mode === "challenge") {
          attempts++;
  
          if (attempts >= 2) {
            setFeedback($feedback, "No more attempts in Challenge Mode.", false);
            disableActivityPermanently();
          } else {
            setFeedback($feedback, "Incorrect. One last try! Take 5 seconds to think before you answer.", false);
  
            $checkBtn.prop("disabled", true);

            setTimeout(function () {
              $checkBtn.prop("disabled", false);
            }, 5000);
          }
        }
      });
    });
  });
  