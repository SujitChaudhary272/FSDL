const btn = document.getElementById("themeBtn");

// Load saved theme
let theme = localStorage.getItem("theme") || "light";
document.body.className = theme;

updateButton();

btn.onclick = function () {
    if (document.body.className === "light") {
        document.body.className = "dark";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.className = "light";
        localStorage.setItem("theme", "light");
    }

    updateButton();
};

function updateButton() {
    btn.textContent = document.body.className === "light"
        ? "Switch to Dark Mode"
        : "Switch to Light Mode";
}