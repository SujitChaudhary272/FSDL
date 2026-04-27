const form = document.getElementById("skillForm");
const nameInput = document.getElementById("skillName");
const percentInput = document.getElementById("skillPercent");
const skillsContainer = document.getElementById("skillsContainer");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = nameInput.value.trim();
    const percent = Number(percentInput.value);

    addSkill(name, percent);
    form.reset();
    nameInput.focus();
});

function addSkill(name, percent) {
    const skill = document.createElement("div");
    skill.className = "skill";

    const skillName = document.createElement("div");
    skillName.className = "skill-name";
    skillName.textContent = name;

    const bar = document.createElement("div");
    bar.className = "bar";

    const progress = document.createElement("div");
    progress.className = "progress";
    progress.textContent = percent + "%";

    bar.appendChild(progress);
    skill.appendChild(skillName);
    skill.appendChild(bar);
    skillsContainer.appendChild(skill);

    // Set width after append so the transition is visible.
    requestAnimationFrame(function () {
        progress.style.width = percent + "%";
    });
}

