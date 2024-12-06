document.addEventListener("DOMContentLoaded", () => {
  const notesKey = "myNotes"; 

  if (window.location.pathname.includes("homepage.html")) {
    const notesList = document.getElementById("notes-list");
    const addNoteButton = document.getElementById("add-note");

    const loadNotes = () => {
      const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
      notesList.innerHTML = ""; 
      notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;
        li.dataset.index = index;
        li.addEventListener("click", () => {
          localStorage.setItem("currentNoteIndex", index); 
          window.location.href = "note.html";
        });
        notesList.appendChild(li);
      });
    };

    addNoteButton.addEventListener("click", () => {
      localStorage.removeItem("currentNoteIndex"); 
      window.location.href = "note.html";
    });

    loadNotes(); 
  }

  if (window.location.pathname.includes("note.html")) {
    const noteContent = document.getElementById("note-content");
    const saveNoteButton = document.getElementById("save-note");
    const outputDiv = document.getElementById("output");

    const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
    const currentNoteIndex = localStorage.getItem("currentNoteIndex");

    if (currentNoteIndex !== null) {
      noteContent.value = notes[currentNoteIndex] || "";
    }

    outputDiv.style.display = 'none';

    saveNoteButton.addEventListener("click", () => {
      const content = noteContent.value.trim();
      if (content) {
        if (currentNoteIndex !== null) {
          notes[currentNoteIndex] = content;
        } else {
          notes.push(content);
        }
        localStorage.setItem(notesKey, JSON.stringify(notes));

        outputDiv.style.display = 'block';
        outputDiv.textContent = content;

      } else {
        alert("Note cannot be empty!");
      }
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("authenticated");
      window.location.href = "signin.html";
    });
  }
});
