function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

var navLinks = document.querySelectorAll(".menu a");

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        var menu = document.getElementById("menu");

        if (window.innerWidth <= 768) {
            menu.classList.remove("show");
        }
    });
}

var sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY + 120;

    for (var i = 0; i < sections.length; i++) {
        var sectionTop = sections[i].offsetTop;
        var sectionHeight = sections[i].offsetHeight;
        var sectionId = sections[i].getAttribute("id");
        var currentLink = document.querySelector('.menu a[href="#' + sectionId + '"]');

        if (currentLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove("active");
                }
                currentLink.classList.add("active");
            }
        }
    }
});