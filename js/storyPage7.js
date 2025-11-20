// js/page7.js
$(document).ready(function () {
    var PAGE_ID = 7;
  
    // Load story for page 7
    loadStoryPage(PAGE_ID, function (page) {
      if (!page) return;
  
      $("#story-heading-7").text(page.heading || "Page 7");
  
      var $storyText = $("#story-text-7");
      $storyText.empty();
  
      if (Array.isArray(page.text)) {
        page.text.forEach(function (line) {
          $("<p>").text(line).appendTo($storyText);
        });
      }
    });
  
    // Load activity for page 7
    loadActivityForPage(PAGE_ID, function (activity) {
      if (!activity) return;
  
      $("#activity-prompt-7").text(activity.prompt || "");
  
      // Update range display live
      $("#activity-range-7").on("input", function () {
        $("#range-value-7").text($(this).val());
      });
  
      $("#check-answer-7").on("click", function () {
        var rating = parseInt($("#activity-range-7").val(), 10);
        var $feedback = $("#activity-feedback-7");
  
        if (rating < 5) {
          setFeedback(
            $feedback,
            "Awww! Maybe the moment felt quiet and gentle to you. 💖",
            true
          );
        } else if (rating === 5) {
          setFeedback(
            $feedback,
            "A calm and peaceful moment. Thanks for your thoughtful rating! ⭐",
            true
          );
        } else if (rating > 5) {
          setFeedback(
            $feedback,
            "Wow! You thought the moment was magical! ✨🌟",
            true
          );
        }
      });
    });
  });
  