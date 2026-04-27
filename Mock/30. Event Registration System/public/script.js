const registrationForm = document.getElementById("registrationForm");
const responseMessage = document.getElementById("responseMessage");
const submitBtn = document.getElementById("submitBtn");
const showStudentsBtn = document.getElementById("showStudentsBtn");
const studentsList = document.getElementById("studentsList");

function setMessage(message, type) {
  responseMessage.textContent = message;
  responseMessage.classList.remove("success", "error");

  if (type) {
    responseMessage.classList.add(type);
  }
}

function renderStudents(students) {
  if (!students.length) {
    studentsList.textContent = "No registrations found in MongoDB.";
    return;
  }

  const rows = students
    .map(
      (student, index) => `
        <article class="student-item">
          <p><strong>${index + 1}. Name:</strong> ${student.name}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Event:</strong> ${student.eventName}</p>
        </article>
      `
    )
    .join("");

  studentsList.innerHTML = rows;
}

async function loadRegisteredStudents() {
  showStudentsBtn.disabled = true;
  showStudentsBtn.textContent = "Loading...";

  try {
    const response = await fetch("/api/registrations");
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch students.");
    }

    renderStudents(result.data || []);
  } catch (error) {
    studentsList.textContent = error.message;
  } finally {
    showStudentsBtn.disabled = false;
    showStudentsBtn.textContent = "Show Registered Students";
  }
}

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const payload = {
    name: formData.get("name")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    eventName: formData.get("eventName")?.toString().trim(),
  };

  if (!payload.name || !payload.email || !payload.eventName) {
    setMessage("Please fill all required fields.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";
  setMessage("", "");

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to save registration.");
    }

    setMessage("Registration successful. Saved to MongoDB.", "success");
    registrationForm.reset();
  } catch (error) {
    setMessage(error.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Register Now";
  }
});

showStudentsBtn.addEventListener("click", loadRegisteredStudents);
