//storyPage5.js
//Created by Aravind Sajeev Kumar
$(document).ready(function () {
    var PAGE_ID = 5;
  
    // 1) Load story for page 5
    loadStoryPage(PAGE_ID, function (page) {
      if (!page) return;
  
      $("#story-heading-5").text(page.heading || "Page 5");
  
      var $storyText = $("#story-text-5");
      $storyText.empty();
  
      if (Array.isArray(page.text)) {
        page.text.forEach(function (line) {
          $("<p>").text(line).appendTo($storyText);
        });
      }
    });
  
    // 2) Load activity for page 5 (open-ended reflection)
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-5").text(activity.prompt || "");
  
      var $input = $("#activity-input-5");
      var $feedback = $("#activity-feedback-5");
      var $checkBtn = $("#check-answer-5");
  
      if (activity.placeholder) {
        $input.attr("placeholder", activity.placeholder);
      }
  
      //Pick a random comment for generic answers
      function pickRandomGeneric() {
        var genericReplies = [
          "Lovely thought! 🌟",
          "That’s a very thoughtful answer. Luna is lucky to have friends like that.",
          "Beautiful idea, you’re really thinking about how friends treat each other.",
          "Nice! You’re understanding the heart of the story very well."
        ];
        var index = Math.floor(Math.random() * genericReplies.length);
        return genericReplies[index];
      }
  
      // Decide feedback based on a few simple keywords
      function chooseFeedback(answerText) {
        var lower = answerText.toLowerCase();
  
        if (lower.includes("kind")) {
          return "Yes, they were kind to Luna and wanted to help her. 💛";
        }
        if (lower.includes("friend") || lower.includes("friendly")) {
          return "Exactly! Good friends stay close and help when things are hard. 🤝";
        }
        if (lower.includes("help")) {
          return "Right! They helped Luna because they cared about her journey. ✨";
        }
        if (lower.includes("brave") || lower.includes("courage")) {
          return "Great point! Their support helped Luna feel brave instead of scared. 🌙";
        }
  
        // Anything else → generic, randomly chosen
        return pickRandomGeneric();
      }
  
      function disableActivity() {
        $input.prop("disabled", true);
        $checkBtn.prop("disabled", true);
      }
  
      $checkBtn.on("click", function () {
        var answer = $input.val().trim();
  
        if (answer.length === 0) {
          setFeedback(
            $feedback,
            "Try typing your idea about why they helped Luna.",
            false
          );
          return;
        }
  
        var message = chooseFeedback(answer);
        setFeedback($feedback, message, true);
        awardStarForPage(PAGE_ID);
        disableActivity();
      });
    });
  });
  