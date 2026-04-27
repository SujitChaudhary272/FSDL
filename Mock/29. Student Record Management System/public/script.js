const rows = document.getElementById("rows");
const msg = document.getElementById("msg");
const resultTable = document.getElementById("resultTable");

const setMsg = (text, ok = true) => {
  msg.textContent = text;
  msg.style.color = ok ? "#175e2b" : "#a81818";
};

const render = (list) => {
  rows.innerHTML = list.map((s) => `
    <tr>
      <td>${s.name}</td>
      <td>${s.rollNo}</td>
      <td>${s.branch}</td>
      <td><button class="delete-btn" data-roll="${s.rollNo}" type="button">Delete</button></td>
    </tr>
  `).join("");
};

async function loadAll() {
  try {
    const res = await fetch("/api/students");
    const list = await res.json();
    render(list);
    resultTable.classList.remove("hidden");
    setMsg(list.length ? "Student details loaded." : "No student records found.", true);
  } catch {
    setMsg("Could not load student details.", false);
  }
}

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = Object.fromEntries(f.entries());

  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  setMsg(data.message, res.ok);
  if (res.ok) {
    e.target.reset();
  }
});

document.getElementById("retrieveBtn").addEventListener("click", loadAll);

rows.addEventListener("click", async (e) => {
  const btn = e.target.closest(".delete-btn");
  if (!btn) return;
  const rollNo = (btn.dataset.roll || "").trim();
  if (!rollNo) return setMsg("Invalid Roll No for delete.", false);

  try {
    btn.disabled = true;
    const res = await fetch(`/api/students/${encodeURIComponent(rollNo)}`, { method: "DELETE" });
    const data = await res.json();
    setMsg(data.message, res.ok);
    if (res.ok) await loadAll();
  } catch {
    setMsg("Delete failed. Server may be offline.", false);
  } finally {
    btn.disabled = false;
  }
});

setMsg("Use Save to add a student, then click Retrieve Student Details.");
