const noteInput = document.getElementById("noteText");
const saveButton = document.getElementById("addNoteBtn");
const noteList = document.getElementById("notesList");

const STORAGE_KEY = "my-color-notes";

function readNotes() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return [];
  }

  try {
    return JSON.parse(savedData);
  } catch (error) {
    return [];
  }
}

function writeNotes(notesArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notesArray));
}

function showNotes() {
  const notesArray = readNotes();
  noteList.innerHTML = "";

  if (notesArray.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-text";
    emptyItem.textContent = "No notes yet. Write your first note.";
    noteList.appendChild(emptyItem);
    return;
  }

  notesArray.forEach(function (singleNote, index) {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const noteText = document.createElement("p");
    noteText.className = "note-text";
    noteText.textContent = singleNote;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      removeNote(index);
    });

    noteItem.appendChild(noteText);
    noteItem.appendChild(deleteButton);
    noteList.appendChild(noteItem);
  });
}

function addNote() {
  const userNote = noteInput.value.trim();

  if (userNote === "") {
    return;
  }

  const notesArray = readNotes();
  notesArray.push(userNote);
  writeNotes(notesArray);
  noteInput.value = "";
  showNotes();
}

function removeNote(noteIndex) {
  const notesArray = readNotes();
  notesArray.splice(noteIndex, 1);
  writeNotes(notesArray);
  showNotes();
}

saveButton.addEventListener("click", addNote);

noteInput.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "Enter") {
    addNote();
  }
});

showNotes();
