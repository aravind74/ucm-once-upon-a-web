// js/shared.js

// Load story.json and return the page object for a given id
function loadStoryPage(pageId, callback) {
    $.getJSON("../data/story.json")
      .done(function (data) {
        var page = data.pages.find(function (p) {
          return p.id === pageId;
        });
        if (!page) {
          console.error("No story page with id", pageId);
        }
        callback(page);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading story.json:", textStatus, errorThrown);
      });
  }
  
  // Load activities.json and return the activity for a given pageId
  function loadActivityForPage(pageId, callback) {
    $.getJSON("../data/activities.json")
      .done(function (data) {
        var activity = data.activities.find(function (a) {
          return a.pageId === pageId;
        });
        if (!activity) {
          console.warn("No activity found for pageId", pageId);
        }
        callback(activity);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading activities.json:", textStatus, errorThrown);
      });
  }
  
  // Simple feedback helper (optional)
  function setFeedback($el, message, isCorrect) {
    $el.text(message);
    $el.removeClass("feedback-correct feedback-wrong");
    if (isCorrect === true) {
      $el.addClass("feedback-correct");
    } else if (isCorrect === false) {
      $el.addClass("feedback-wrong");
    }
  }

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
}

  