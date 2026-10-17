// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Create an array to store notes
let notes = [];

// 3. Update the note count
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// 4. Delete a note using its ID
function deleteNote(noteId) {
  notes = notes.filter(function (note) {
    return note.id !== noteId;
  });

  render();
}

// 5. Render the notes on the page
function render() {
  notesList.replaceChildren();

  notes.forEach(function (note) {
    // Create the note card
    const listItem = document.createElement("li");
    listItem.classList.add(
      "note-card",
      `category-${note.category}`
    );

    // Display the note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Display the category
    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent =
      note.category.charAt(0).toUpperCase() +
      note.category.slice(1);

    // Display the creation date
    const dateLabel = document.createElement("p");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = `Created: ${note.createdAt}`;

    // Create the Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Delete only this note when clicked
    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    // Add all elements to the card
    listItem.append(
      noteText,
      categoryLabel,
      dateLabel,
      deleteButton
    );

    // Add the card to the notes list
    notesList.appendChild(listItem);
  });

  updateNoteCount();
}

// 6. Handle form submission and validate the note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Reject empty notes
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Reject notes longer than 200 characters
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear any previous validation error
  errorMessage.textContent = "";

  // Create the new note object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Add the note to the array
  notes.push(newNote);

  // Clear the input field
  noteInput.value = "";

  // Refresh the displayed notes and count
  render();
});

// 7. Display the initial page
render();