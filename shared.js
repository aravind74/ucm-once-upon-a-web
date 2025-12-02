//shared.js
//Created by Aravind Sajeev Kumar

// Load story.json and return the page object for a given id
function loadStoryPage(pageId, callback) {
  $.ajax({
    url: "../data/story.json",
    method: "GET",
    dataType: "json",

    success: function (data) {
      var page = data.pages.find(function (p) {
        return p.id === pageId;
      });

      if (!page) {
        console.error("No story page with id", pageId);
      }

      callback(page);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading story.json:", textStatus, errorThrown);
    }
  });
} //loadStoryPage()


// Load activities.json and return the activity for a given pageId
function loadActivityForPage(pageId, callback) {
  $.ajax({
    url: "../data/activities.json",
    method: "GET",
    dataType: "json",

    success: function (data) {
      var activity = data.activities.find(function (a) {
        return a.pageId === pageId;
      });

      if (!activity) {
        console.warn("No activity found for pageId", pageId);
      }

      callback(activity);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading activities.json:", textStatus, errorThrown);
    }
  });
} //loadActivityForPage()

// Simple feedback helper (optional)
function setFeedback($el, message, isCorrect) {
  $el.text(message);
  $el.removeClass("feedback-correct feedback-wrong");
  if (isCorrect === true) {
    $el.addClass("feedback-correct");
  } else if (isCorrect === false) {
    $el.addClass("feedback-wrong");
  }
} //setFeedback()

// simplest click → slide → navigate
$(document).on("click", ".side-nav-link", function (e) {
  e.preventDefault();

  const href = $(this).attr("href");
  const dir = $(this).hasClass("next") ? "left" : "right";

  if (dir === "left") {
    $(".page-wrapper").addClass("page-slide-left");
  } else {
    $(".page-wrapper").addClass("page-slide-right");
  }

  setTimeout(() => {
    window.location.href = href;
  }, 250); // match animation duration
});

function getReaderMode() {
  return localStorage.getItem("readerMode") || "normal";
} //getReaderMode()

function getStarCount() {
  return parseInt(localStorage.getItem("starCount") || "0", 10); //Get star count from localstorage.
} //getStarCount()

function setStarCount(n) {
  localStorage.setItem("starCount", String(n)); //Set star count from localstorage.
} //setStarCount()

function updateStarDisplay() {
  var count = getStarCount();
  $(".star-counter").text("⭐ Stars: " + count);
} //updateStarDisplay()

function addStar() {
  var current = getStarCount();
  setStarCount(current + 1);
  updateStarDisplay();
} //addStar()

function awardStarForPage(pageId) {
  var key = "starPage_" + pageId; //Prevent giving multiple stars for the same page
  if (localStorage.getItem(key) === "true") {
    return; // already awarded for this page
  }
  addStar();
  localStorage.setItem(key, "true");
} //awardStarForPage()

// Update star counter on every page load
$(document).ready(function () {
  updateStarDisplay();
}); //ready end


