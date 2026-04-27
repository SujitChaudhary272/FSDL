const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

function filterCards(category) {
  let visibleCards = 0;

  cards.forEach(function (card) {
    if (category === "all" || card.dataset.category === category) {
      card.classList.remove("hide");
      visibleCards++;
    } else {
      card.classList.add("hide");
    }
  });

  if (visibleCards === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    filterCards(button.dataset.filter);
  });
});

filterCards("all");
