// js/page6.js
$(document).ready(function () {
    var PAGE_ID = 6;
  
    // 1) Load story for page 6
    loadStoryPage(PAGE_ID, function (page) {
      if (!page) return;
  
      $("#story-heading-6").text(page.heading || "Page 6");
  
      var $storyText = $("#story-text-6");
      $storyText.empty();
  
      if (Array.isArray(page.text)) {
        page.text.forEach(function (line) {
          $("<p>").text(line).appendTo($storyText);
        });
      }
    });
  
    // 2) Load activity for page 6
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-6").text(activity.prompt || "");
  
      var $textarea = $("#activity-textarea-6");
      if (activity.placeholder) {
        $textarea.attr("placeholder", activity.placeholder);
      }
  
      $("#check-answer-6").on("click", function () {
        var $feedback = $("#activity-feedback-6");
        var answer = $textarea.val().trim();
  
        if (answer.length === 0) {
          setFeedback(
            $feedback,
            "Try using a few words to describe the star. How does it look or feel?",
            false
          );
          return;
        }
  
        // Open-ended: just positive feedback
        setFeedback(
          $feedback,
          "Beautiful description! You imagined the star really well. 🌟",
          true
        );
  
        // Optional: reward a star for any thoughtful answer
        // addStar();
      });
    });
  });
  