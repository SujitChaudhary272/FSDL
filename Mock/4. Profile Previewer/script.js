const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const bioInput = document.getElementById("bioInput");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewBio = document.getElementById("previewBio");

function updatePreview() {
    previewName.textContent = nameInput.value.trim() || "Your Name";
    previewEmail.textContent = emailInput.value.trim() || "your@email.com";
    previewBio.textContent = bioInput.value.trim() || "Your bio will appear here.";
}

nameInput.addEventListener("input", updatePreview);
emailInput.addEventListener("input", updatePreview);
bioInput.addEventListener("input", updatePreview);