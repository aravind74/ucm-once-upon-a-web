// js/page5.js
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
  
    // 2) Load activity for page 5
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-5").text(activity.prompt || "");
  
      var $input = $("#activity-input-5");
  
      if (activity.placeholder) {
        $input.attr("placeholder", activity.placeholder);
      }
  
      // Open-ended answer: just check if they typed something
      $("#check-answer-5").on("click", function () {
        var answer = $input.val().trim();
        var $feedback = $("#activity-feedback-5");
  
        if (answer.length === 0) {
          setFeedback(
            $feedback,
            "Try typing your idea about why they helped Luna.",
            false
          );
          return;
        }
  
        // We’re not marking right/wrong, just encouraging reflection
        setFeedback(
          $feedback,
          "Lovely thought! Friends help because they care. 🌟",
          true
        );
  
        // Later you can call addStar() here if you want to reward any answer:
        // addStar();
      });
    });
  });
  