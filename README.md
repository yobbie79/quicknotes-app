# QuickNotes App

## Overview

QuickNotes is a lightweight, responsive web application for creating and managing notes. Built with HTML, CSS, and vanilla JavaScript, the application allows users to organise notes into categories, search for specific notes, and delete notes they no longer need. Notes are stored in the browser using localStorage, allowing them to remain available when the page is refreshed.

The project demonstrates the practical application of core web development concepts, including semantic HTML, responsive CSS, DOM manipulation, form validation, and browser-based data persistence.

## Features

* **Create notes:** Add notes and assign them to Personal, Work, or Study categories.
* **Input validation:** Prevent empty notes and limit note content to 200 characters.
* **Search:** Filter notes by text using a case-insensitive search.
* **Delete notes:** Remove individual notes from the list.
* **Persistent storage:** Save and retrieve notes using localStorage and JSON.
* **Note organisation:** Display each note's category and creation date.
* **Responsive interface:** Adapt the layout for desktop and smaller screens.

## Technologies Used

* **HTML5** — semantic page structure and form elements.
* **CSS3** — layout, styling, category indicators, and responsive design.
* **JavaScript** — application logic, validation, event handling, and DOM updates.
* **Web Storage API** — local persistence through localStorage.
* **Git and GitHub** — version control and source code hosting.

## Getting Started

### Requirements

A modern web browser and a code editor such as Visual Studio Code.

### Running Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` directly in a browser or launch it using the Live Server extension.
4. Create, search, and manage notes through the interface.

No package installation or build process is required.

## Data Storage

Notes are stored locally in the browser. They remain available after refreshing the page in the same browser and storage context. Clearing the browser's site data may remove them. The application does not use a remote database or synchronise notes between devices.

## What I Learned

This project provided practical experience in structuring web pages with semantic HTML, building responsive interfaces with CSS, validating user input, updating page content dynamically with JavaScript, and persisting application data with localStorage. It also strengthened my understanding of using Git and GitHub to manage project changes.
