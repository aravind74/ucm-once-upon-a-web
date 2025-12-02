//Created by Alvi Haroon
$(document).ready(() => {
  const nameDisplay = $("#certificate-name-display");
  const starsSpan   = $("#certificate-stars");
  const dateSpan    = $("#certificate-date");
  const statusEl    = $("#certificate-status");
  const printBtn    = $("#print-certificate");

  // Load name
  const storedName = (localStorage.getItem("readerName") || "").trim();
  nameDisplay.text(storedName || "A Brave Reader");

  // Load quiz stars
  const quizStars = parseInt(localStorage.getItem("starCount") || "0", 10);
  const totalStars = 7;

  const full  = "★".repeat(quizStars);
  const empty = "☆".repeat(totalStars - quizStars);
  starsSpan.text(full + empty);

  // Date
  const now = new Date();
  const opts = { year: "numeric", month: "long", day: "numeric" };
  dateSpan.text(now.toLocaleDateString(undefined, opts));

  // Print
  printBtn.on("click", () => {
    statusEl.text("Opening print dialog...");
    window.print();
    setTimeout(() => statusEl.text(""), 1500);
  });
});
