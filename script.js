const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const notesDiv = document.getElementById("notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Add note
addBtn.addEventListener("click", () => {
  if (!titleInput.value || !contentInput.value) return;

  const note = {
    id: Date.now(),
    title: titleInput.value,
    content: contentInput.value
  };

  notes.push(note);
  saveNotes();
  renderNotes();

  titleInput.value = "";
  contentInput.value = "";
});

// Render notes
function renderNotes() {
  notesDiv.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <span class="delete"> DELETE</span>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    `;

    div.querySelector(".delete").onclick = () => {
      deleteNote(note.id);
    };

    notesDiv.appendChild(div);
  });
}

// Delete note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

// Save to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Initial render
renderNotes();
