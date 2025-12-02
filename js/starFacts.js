//starFacts.js
//Created by Aravind Sajeev Kumar
document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById("load-facts");
    const factsContainer = document.getElementById("facts-list");
    const statusEl = document.getElementById("facts-status");

    if (!loadButton || !factsContainer || !statusEl) return;

    function loadStarFacts() {
        statusEl.textContent = "Loading star facts from XML...";
        factsContainer.innerHTML = "";

        fetch("../data/starFacts.xml")
            .then((res) => res.text())
            .then((xmlText) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "application/xml");

                const parserError = xmlDoc.querySelector("parsererror");
                if (parserError) {
                    console.error("XML parse error:", parserError.textContent);
                    throw new Error("Could not parse XML");
                }

                const facts = xmlDoc.getElementsByTagName("fact");
                if (!facts.length) {
                    statusEl.textContent = "No facts found in the XML file.";
                    return;
                }

                for (let fact of facts) {
                    const title =
                        fact.getElementsByTagName("title")[0]?.textContent ?? "";
                    const summary =
                        fact.getElementsByTagName("summary")[0]?.textContent ?? "";
                    const category =
                        fact.getElementsByTagName("category")[0]?.textContent ?? "";

                    const factDiv = document.createElement("div");
                    factDiv.className = "fact-item";

                    factDiv.innerHTML = `
              <h4 class="fact-title">${title}</h4>
              <p class="fact-summary">${summary}</p>
              ${category
                            ? `<span class="fact-tag">${category}</span>`
                            : ""
                        }
            `;

                    factsContainer.appendChild(factDiv);
                }

                // statusEl.textContent = `Loaded ${facts.length} facts from XML.`;
            })
            .catch((err) => {
                console.error(err);
                statusEl.textContent =
                    "Sorry, there was a problem loading the star facts.";
            });
    } //loadStarFacts()

    loadButton.addEventListener("click", loadStarFacts);
});

$(document).ready(function () {
    var stars = getStarCount();
    $("#star-facts-summary").text("You collected " + stars + " shining stars!");
}); //ready end

