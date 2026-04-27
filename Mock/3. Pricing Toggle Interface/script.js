let isYearlyPlan = false;

const toggleButton = document.getElementById("toggleBtn");
const billingTypeText = document.getElementById("billingType");
const allPriceTags = document.querySelectorAll(".price");

toggleButton.addEventListener("click", function () {
    isYearlyPlan = !isYearlyPlan;

    allPriceTags.forEach(function (priceTag) {
        const monthlyPrice = priceTag.dataset.monthly;
        const yearlyPrice = priceTag.dataset.yearly;
        const selectedPrice = isYearlyPlan ? yearlyPrice : monthlyPrice;
        priceTag.textContent = "Rs " + selectedPrice;
    });

    if (isYearlyPlan) {
        billingTypeText.textContent = "Yearly Plan";
        toggleButton.textContent = "Switch to Monthly";
    } else {
        billingTypeText.textContent = "Monthly Plan";
        toggleButton.textContent = "Switch to Yearly";
    }
});