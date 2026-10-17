// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Create an array to store notes
let notes = [];

// 3. Display the correct note count
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// 4. Create and display the note cards
function render() {
  // Remove the existing displayed notes
  notesList.replaceChildren();

  // Create a card for each note
  notes.forEach(function (note) {
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

    // Date and time
    const dateLabel = document.createElement("p");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = `Created: ${note.createdAt}`;

    // Delete button (its functionality comes in Task 4)
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Add elements to the note card
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

// 5. Add a new note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Full validation and error messages will be added in Task 4
  if (text === "") {
    return;
  }

  // Create a note object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Store the note in the array
  notes.push(newNote);

  // Clear the input field
  noteInput.value = "";
  errorMessage.textContent = "";

  // Update the page
  render();
});

// 6. Display the initial page
render();