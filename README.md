# Todo App

A vanilla JavaScript todo list application built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- **Projects** — Organize todos into separate projects. A default "Inbox" project is created automatically.
- **Full CRUD** — Create, view, edit, and delete todos with title, description, due date, and priority.
- **Expandable Details** — Click a todo to expand/collapse its description, due date, and priority.
- **Priority Indicators** — Color-coded left border (green/orange/red) shows Low/Medium/High priority at a glance.
- **Filter Views** — Sidebar filters for Upcoming, Low/Medium/High priority, and Completed todos across all projects.
- **Persistence** — All data is saved to `localStorage` and restored on page load.
- **Modular Architecture** — Separated into models, store, storage, UI, validation, and controller modules following SOLID principles.

## Tech Stack

- Vanilla JavaScript (ES Modules)
- SCSS
- Webpack (dev server + production build)
- date-fns for date formatting
- localStorage for persistence

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```sh
git clone https://github.com/tanwa1/ToDoApp.git
cd ToDoApp
npm install
```

### Development

```sh
npm run start
```

Opens at [http://localhost:8080](http://localhost:8080).

### Production Build

```sh
npm run build
```

Output goes to the `dist/` folder.

## Project Structure

```
src/
├── index.js          # Entry point
├── index.html        # HTML template with dialogs
├── style.scss        # All styling
├── models.js         # ToDo and Project classes
├── store.js          # State management and CRUD operations
├── storage.js        # localStorage persistence and data revival
├── controller.js     # Event listeners and DOM coordination
├── ui.js             # DOM rendering functions
├── validation.js     # Form input validation
└── assets/           # Icons and images
```

## SOLID Principles Applied

- **Single Responsibility Principle (SRP)** — Each module has one job:
  - `models.js` — Defines data structures (`ToDo`, `Project`) and nothing else.
  - `store.js` — Owns the projects array and all CRUD operations (add/remove/find projects and todos).
  - `storage.js` — Handles only `localStorage` persistence: saving, loading, and reviving serialized data back into class instances.
  - `ui.js` — Responsible solely for DOM rendering (building elements, rendering project lists, rendering todos).
  - `validation.js` — Contains only form validation logic.
  - `controller.js` — Wires event listeners and coordinates between store and UI, but contains no data logic or DOM building.

- **Open/Closed Principle (OCP)** — `ToDo.update(fields)` accepts any subset of fields to update without requiring a new method for each property. Filter views (Upcoming, Priority, Complete) can be extended with new filters without modifying existing ones.

- **Dependency Inversion Principle (DIP)** — `controller.js` depends on abstractions (imported functions from `store.js` and `ui.js`) rather than directly manipulating the projects array or `localStorage`. The store functions hide the underlying data structure.

## Project Structure
```
ToDoApp/
├── dist/                # Production build output
├── node_modules/        # Dependencies
├── src/                 # Source files
│   ├── assets/          # Images and static assets
│   ├── index.html       # HTML template
│   ├── index.js         # App entry
│   ├── main.js          # Main module (app logic)
│   └── restoTemplate.css # Styles (rename when ready)
├── package.json         # Project metadata and scripts
├── webpack.common.js    # Webpack common config
├── webpack.dev.js       # Webpack dev config
├── webpack.prod.js      # Webpack prod config
└── README.md            # Project documentation
```
