//home.js
//Created by Alvi Haroon
$(document).ready(function () {
    $("#startStoryBtn").on("click", function () {
        var name = $("#reader-name").val().trim();
        var mode = $("#reader-mode").val().trim();
        var $feedback = $("#home-feedback");

        if (name.length === 0) {
            $feedback.text("Please enter your name to start the story.");
            $feedback.removeClass("feedback-correct").addClass("feedback-wrong");
            return;
        }
        // store name and mode
        localStorage.setItem("readerName", name);
        localStorage.setItem("readerMode", mode);
        // go to first story page
        window.location.href = "storyPage1.html";
    });
});