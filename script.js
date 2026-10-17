// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Define the localStorage key
const STORAGE_KEY = "quicknotes-notes";

// 3. Load saved notes from localStorage
function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (savedNotes !== null) {
      const parsedNotes = JSON.parse(savedNotes);

      if (Array.isArray(parsedNotes)) {
        notes = parsedNotes;
      }
    }
  } catch (error) {
    console.error("Could not load saved notes:", error);
    notes = [];
  }
}

// 4. Create the notes array
let notes = [];

// Load previously saved notes
loadNotes();

// 5. Save notes to localStorage
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
    errorMessage.textContent =
      "Your notes could not be saved in this browser.";
  }
}

// 6. Update the note count
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// 7. Delete a note using its ID
function deleteNote(noteId) {
  notes = notes.filter(function (note) {
    return note.id !== noteId;
  });

  saveNotes();
  render();
}

// 8. Render the notes and apply the search
function render() {
  notesList.replaceChildren();

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });

  // Show a message if the search has no results
  if (filteredNotes.length === 0 && searchTerm !== "") {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No notes match your search.";
    notesList.appendChild(emptyMessage);
  }

  // Create a card for each matching note
  filteredNotes.forEach(function (note) {
    const listItem = document.createElement("li");

    listItem.classList.add(
      "note-card",
      `category-${note.category}`
    );

    // Note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Category label
    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent =
      note.category.charAt(0).toUpperCase() +
      note.category.slice(1);

    // Creation date
    const dateLabel = document.createElement("p");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = `Created: ${note.createdAt}`;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    // Assemble the note card
    listItem.append(
      noteText,
      categoryLabel,
      dateLabel,
      deleteButton
    );

    notesList.appendChild(listItem);
  });

  // Count all saved notes, not just search results
  updateNoteCount();
}

// 9. Add a new note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validate empty notes
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validate note length
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear previous errors
  errorMessage.textContent = "";

  // Create the note object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Store and save the note
  notes.push(newNote);
  saveNotes();

  // Clear the input and refresh the list
  noteInput.value = "";
  render();
});

// 10. Search notes as the user types
searchInput.addEventListener("input", function () {
  render();
});

// 11. Display saved notes when the page opens
render();