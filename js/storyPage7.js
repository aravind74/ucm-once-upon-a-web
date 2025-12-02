//storyPage7.js
//Created by Aravind Sajeev Kumar
$(document).ready(function () {
    var PAGE_ID = 7;

    // 1) Load story for page 7
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
    }); //loadStoryPage()

    // 2) Load activity for page 7 (clickable star rating)
    loadActivityForPage(PAGE_ID, function (activity) {
        if (!activity) return;

        $("#activity-prompt-7").text(
            activity.prompt || "How much did you enjoy Luna’s adventure?"
        );

        var $stars = $("#star-rating-7 .star-icon");
        var $ratingValue = $("#rating-value-7");
        var $feedback = $("#activity-feedback-7");
        var $checkBtn = $("#check-answer-7");

        var ratingLocked = false;

        // Helper: render stars up to 'value' as filled
        function renderStars(value) {
            var current = parseInt(value, 10) || 0;
            $stars.each(function () {
                var starVal = parseInt($(this).data("value"), 10);
                if (starVal <= current) {
                    $(this).addClass("star-filled");
                } else {
                    $(this).removeClass("star-filled");
                }
            });
        } //renderStars()

        // Hover effect (only if rating is not locked yet)
        $stars.on("mouseenter", function () {
            if (ratingLocked) return;
            var hoverValue = $(this).data("value");
            renderStars(hoverValue);
        });

        $("#star-rating-7").on("mouseleave", function () {
            if (ratingLocked) return;
            // Reset to whatever is in the hidden rating value
            renderStars($ratingValue.val());
        });

        // Click to choose rating (but don’t lock until Save)
        $stars.on("click", function () {
            if (ratingLocked) return;
            var value = $(this).data("value");
            $ratingValue.val(value);
            renderStars(value);
        });

        function disableRating() {
            ratingLocked = true;
            $stars.prop("disabled", true);
            $checkBtn.prop("disabled", true);
        } //disableRating()

        // Save button: show feedback + award star
        $checkBtn.on("click", function () {
            var rating = parseInt($ratingValue.val(), 10) || 0;

            if (rating === 0) {
                setFeedback(
                    $feedback,
                    "Tap the stars to choose how much you liked the ending. ⭐",
                    false
                );
                return;
            }

            var message;
            if (rating <= 2) {
                message = "A gentle ending for you. Thanks for sharing your rating. 💫";
            } else if (rating <= 4) {
                message = "Yay! We’re glad you enjoyed Luna’s adventure. 🌟";
            } else {
                message = "Wow! You LOVED the ending! That’s truly starry!! ✨🌙";
            }

            setFeedback($feedback, message, true);
            awardStarForPage(PAGE_ID);
            disableRating();
        });
    }); //loadActivityForPage()
}); //ready end
