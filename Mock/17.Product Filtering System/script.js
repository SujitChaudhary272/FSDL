const buttons = document.querySelectorAll(".btn");
const cards = document.querySelectorAll(".card");

buttons.forEach((button) =>
	button.onclick = () => {
		buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
		cards.forEach((card) => card.hidden = button.dataset.filter !== "All" && card.dataset.category !== button.dataset.filter);
	},
);
