const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function () {
    const filter = searchBar.value.toLowerCase();
    const rows = document.querySelectorAll("#glossaryTable tbody tr");

    rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});