# Project Structure

## Directory Layout

```
productivity-dashboard/
├── index.html              # Main HTML file with all markup
├── css/
│   └── styles.css         # Single CSS file for all styling
├── js/
│   └── app.js             # Single JavaScript file with all logic
├── tests/                 # Test files (if implemented)
│   ├── unit/             # Unit tests for specific examples
│   └── properties/       # Property-based tests
├── .kiro/
│   ├── specs/            # Spec-driven development documents
│   │   └── productivity-dashboard/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   └── steering/         # AI assistant guidance documents
└── README.md
```

## File Organization Principles

### Single-File Approach

The application intentionally uses a single-file approach for simplicity:
- **One HTML file**: All markup in `index.html`
- **One CSS file**: All styles in `css/styles.css`
- **One JavaScript file**: All logic in `js/app.js`

This keeps the project simple and eliminates the need for build tools or module bundlers.

### Component Organization in JavaScript

Within `js/app.js`, code is organized by component:

1. **Greeting Module**: Time, date, and greeting display logic
2. **Focus Timer**: Timer state management and controls
3. **Task List**: Task CRUD operations and rendering
4. **Quick Links Panel**: Link management and rendering
5. **Initialization**: DOMContentLoaded event handler to bootstrap all components

Each component is self-contained with its own:
- DOM element references
- State management
- Event handlers
- Rendering functions
- Local Storage integration

### Data Storage

All user data is stored in browser Local Storage using these keys:
- `"productivity-dashboard-tasks"`: Array of Task objects
- `"productivity-dashboard-links"`: Array of QuickLink objects

### Spec Files

The `.kiro/specs/productivity-dashboard/` directory contains the formal specification:
- **requirements.md**: User stories and acceptance criteria
- **design.md**: Architecture, data models, and correctness properties
- **tasks.md**: Implementation task breakdown

These documents follow the spec-driven development methodology and should be consulted when making changes to ensure alignment with requirements.

## Naming Conventions

- **Files**: lowercase with hyphens (e.g., `styles.css`, `app.js`)
- **DOM IDs**: kebab-case (e.g., `#timer-display`, `#task-list`)
- **CSS Classes**: kebab-case (e.g., `.task-item`, `.link-button`)
- **JavaScript Functions**: camelCase (e.g., `initTimer`, `addTask`)
- **JavaScript Constants**: camelCase for regular constants, UPPER_SNAKE_CASE for true constants
