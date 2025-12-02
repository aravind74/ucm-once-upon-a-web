// js/about-author.js
// Created by Alvi Haroon
$(document).ready(function () {
  // Task 1: Display Author Information
  const authorDetails = {
    name1: "Aravind Sajeev Kumar",
    role1: "Story Author & Concept Lead",
    bio1:
      "Aravind Sajeev Kumar is the visionary behind the narrative, focusing on building the story throughout pages 1–7.",

    name2: "Alvi Haroon",
    role2: "Lead Programmer & Web Developer",
    bio2:
      "Alvi Haroon developed the interactive experience, coding the home, about, and certificate pages, and implementing the overall site design."
  };

  $("#author-name1").text(authorDetails.name1);
  $("#author-role1").text(authorDetails.role1);
  $("#author-bio1").text(authorDetails.bio1);

  $("#author-name2").text(authorDetails.name2);
  $("#author-role2").text(authorDetails.role2);
  $("#author-bio2").text(authorDetails.bio2);

  // Task 2: Handle Feedback Form
  const $form = $("#about-form");
  const $feedbackText = $("#about-feedback-text");

  $("#about-submit-button").on("click", function () {
    const email = $("#about-email").val().trim();
    const message = $("#about-message").val().trim();

    if (message.length === 0) {
      $feedbackText.text("Please enter a message before submitting your note.");
      $feedbackText.removeClass("feedback-correct").addClass("feedback-wrong");
      return;
    }

    // Simulate successful submission
    console.log(`Sending feedback. Email: ${email}, Message: ${message}`);

    $feedbackText.text(
      "Thank you for your tiny note! Your feedback has been received."
    );
    $feedbackText.removeClass("feedback-wrong").addClass("feedback-correct");

    // Clear form
    $form[0].reset();
  });

  // Task 3: Handle Form Clear
  $("#about-clear-button").on("click", function () {
    $form[0].reset();
    $feedbackText.text("");
    $feedbackText.removeClass("feedback-correct feedback-wrong");
  });
  //Task 4: Handle Start Again
  $("#start-again-button").on("click", function() {
    window.location.href = "home.html";
    localStorage.clear(); // Clear all collected story data
  })
});
