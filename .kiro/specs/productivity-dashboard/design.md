# Design Document: Productivity Dashboard

## Overview

The Productivity Dashboard is a single-page web application built with vanilla JavaScript, HTML, and CSS. It provides a focused productivity interface with four main components: a greeting module with time/date display, a 25-minute focus timer, a task management system, and a quick links panel. The application is entirely client-side with no backend dependencies, using the browser's Local Storage API for data persistence.

### Key Design Principles

- **Simplicity**: Vanilla JavaScript with no frameworks or build tools
- **Performance**: Minimal DOM manipulation, efficient event handling
- **Persistence**: All user data stored locally in the browser
- **Modularity**: Clear separation of concerns between components
- **Responsiveness**: Immediate UI feedback for all user interactions

### Technology Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Single stylesheet for all styling
- **Vanilla JavaScript (ES6+)**: No frameworks or libraries
- **Local Storage API**: Client-side data persistence
- **Modern Browser APIs**: Date, setInterval, addEventListener

## Architecture

### Application Structure

The application follows a modular architecture with four independent components that communicate through a shared data layer (Local Storage). Each component is responsible for its own DOM manipulation, event handling, and state management.

```
┌─────────────────────────────────────────────────────────┐
│                    index.html                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Greeting Module                         │  │
│  │  - Time Display (updates every second)            │  │
│  │  - Date Display                                   │  │
│  │  - Time-based Greeting                            │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Focus Timer                             │  │
│  │  - Timer Display (MM:SS)                          │  │
│  │  - Start/Stop/Reset Controls                      │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Task List                               │  │
│  │  - Task Input Form                                │  │
│  │  - Task Items (with edit/delete/toggle)           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Quick Links Panel                       │  │
│  │  - Link Input Form (name + URL)                   │  │
│  │  - Link Buttons (with delete)                     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Local Storage       │
              │  - tasks: Task[]      │
              │  - quickLinks: Link[] │
              └───────────────────────┘
```

### File Structure

```
productivity-dashboard/
├── index.html              # Main HTML file with all markup
├── css/
│   └── styles.css         # Single CSS file for all styling
└── js/
    └── app.js             # Single JavaScript file with all logic
```

### Component Responsibilities

**Greeting Module**
- Displays current time in 12-hour format with AM/PM
- Displays current date in readable format
- Shows time-based greeting (Morning/Afternoon/Evening/Night)
- Updates time every second via setInterval
- No data persistence required

**Focus Timer**
- Manages 25-minute countdown timer (1500 seconds)
- Displays time in MM:SS format
- Handles start/stop/reset controls
- Updates display every second when running
- Stops at 00:00 without wrapping
- No data persistence required (timer resets on page load)

**Task List**
- Manages task creation, editing, deletion
- Tracks task completion status
- Persists all tasks to Local Storage
- Loads tasks from Local Storage on initialization
- Validates input (no empty tasks)
- Maintains task order (creation order)

**Quick Links Panel**
- Manages quick link creation and deletion
- Opens links in new tabs
- Persists all links to Local Storage
- Loads links from Local Storage on initialization
- Validates input (no empty name or URL)

## Components and Interfaces

### Greeting Module

**DOM Elements**
- `#time-display`: Text element for time (e.g., "2:30 PM")
- `#date-display`: Text element for date (e.g., "Monday, January 15, 2024")
- `#greeting-text`: Text element for greeting (e.g., "Good Afternoon")

**Functions**
```javascript
function initGreeting()
  // Initialize greeting module
  // Start interval for time updates
  
function updateTimeAndGreeting()
  // Get current date/time
  // Update time display (12-hour format)
  // Update date display
  // Update greeting based on time period
  
function getGreeting(hour)
  // Returns: "Good Morning" | "Good Afternoon" | "Good Evening" | "Good Night"
  // Based on hour (0-23)
```

**Update Frequency**
- Time/Date/Greeting: Every 1000ms (1 second)

### Focus Timer

**DOM Elements**
- `#timer-display`: Text element showing MM:SS
- `#timer-start`: Button to start timer
- `#timer-stop`: Button to stop/pause timer
- `#timer-reset`: Button to reset to 25:00

**State**
```javascript
{
  remainingSeconds: number,  // Current remaining time
  isRunning: boolean,        // Timer running state
  intervalId: number | null  // setInterval ID
}
```

**Functions**
```javascript
function initTimer()
  // Initialize timer at 25 minutes (1500 seconds)
  // Attach event listeners to buttons
  
function startTimer()
  // Start countdown if not already running
  // Update display every second
  
function stopTimer()
  // Pause countdown
  // Clear interval
  
function resetTimer()
  // Stop timer
  // Reset to 1500 seconds
  // Update display
  
function updateTimerDisplay()
  // Format remainingSeconds as MM:SS
  // Update DOM element
  
function formatTime(seconds)
  // Returns: string in MM:SS format
```

### Task List

**DOM Elements**
- `#task-input`: Input field for new task text
- `#task-form`: Form element for task submission
- `#task-list`: Container for task items
- `.task-item`: Individual task elements (dynamically created)
- `.task-checkbox`: Checkbox for completion status
- `.task-text`: Text display/edit field
- `.task-edit-btn`: Edit button
- `.task-delete-btn`: Delete button

**Functions**
```javascript
function initTaskList()
  // Load tasks from Local Storage
  // Render tasks
  // Attach form submit listener
  
function loadTasks()
  // Returns: Task[] from Local Storage
  // Returns empty array if no data
  
function saveTasks(tasks)
  // Save Task[] to Local Storage
  
function addTask(text)
  // Create new Task object
  // Add to tasks array
  // Save to Local Storage
  // Render new task
  // Clear input field
  
function toggleTaskComplete(taskId)
  // Find task by ID
  // Toggle completed status
  // Save to Local Storage
  // Update task display
  
function editTask(taskId, newText)
  // Find task by ID
  // Update text
  // Save to Local Storage
  // Update task display
  
function deleteTask(taskId)
  // Remove task from array
  // Save to Local Storage
  // Remove from DOM
  
function renderTasks(tasks)
  // Clear task list container
  // Create DOM elements for each task
  // Attach event listeners
  
function renderTask(task)
  // Returns: HTMLElement for single task
  // Includes checkbox, text, edit, delete controls
```

### Quick Links Panel

**DOM Elements**
- `#link-name-input`: Input field for link name
- `#link-url-input`: Input field for link URL
- `#link-form`: Form element for link submission
- `#links-container`: Container for link buttons
- `.link-button`: Individual link buttons (dynamically created)
- `.link-delete-btn`: Delete button for each link

**Functions**
```javascript
function initQuickLinks()
  // Load links from Local Storage
  // Render links
  // Attach form submit listener
  
function loadLinks()
  // Returns: QuickLink[] from Local Storage
  // Returns empty array if no data
  
function saveLinks(links)
  // Save QuickLink[] to Local Storage
  
function addLink(name, url)
  // Create new QuickLink object
  // Add to links array
  // Save to Local Storage
  // Render new link
  // Clear input fields
  
function deleteLink(linkId)
  // Remove link from array
  // Save to Local Storage
  // Remove from DOM
  
function openLink(url)
  // Open URL in new tab using window.open
  
function renderLinks(links)
  // Clear links container
  // Create DOM elements for each link
  // Attach event listeners
  
function renderLink(link)
  // Returns: HTMLElement for single link button
  // Includes click handler and delete button
```

## Data Models

### Task

Represents a single to-do item with text content and completion status.

```javascript
{
  id: string,           // Unique identifier (timestamp-based or UUID)
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: number     // Timestamp (milliseconds since epoch)
}
```

**Validation Rules**
- `text`: Must be non-empty string after trimming whitespace
- `completed`: Boolean value (defaults to false)
- `id`: Must be unique within the task list
- `createdAt`: Used for maintaining creation order

**Storage Key**: `"productivity-dashboard-tasks"`

**Storage Format**: JSON array of Task objects

**Example**
```json
[
  {
    "id": "task-1705334400000",
    "text": "Complete project proposal",
    "completed": false,
    "createdAt": 1705334400000
  },
  {
    "id": "task-1705334500000",
    "text": "Review pull requests",
    "completed": true,
    "createdAt": 1705334500000
  }
]
```

### QuickLink

Represents a user-defined website shortcut with name and URL.

```javascript
{
  id: string,      // Unique identifier (timestamp-based or UUID)
  name: string,    // Display name for the link
  url: string      // Target URL
}
```

**Validation Rules**
- `name`: Must be non-empty string after trimming whitespace
- `url`: Must be non-empty string after trimming whitespace
- `id`: Must be unique within the links list
- `url`: Should be a valid URL format (basic validation)

**Storage Key**: `"productivity-dashboard-links"`

**Storage Format**: JSON array of QuickLink objects

**Example**
```json
[
  {
    "id": "link-1705334400000",
    "name": "GitHub",
    "url": "https://github.com"
  },
  {
    "id": "link-1705334500000",
    "name": "Gmail",
    "url": "https://mail.google.com"
  }
]
```

### Local Storage Integration

**Storage Operations**

All Local Storage operations use try-catch blocks to handle quota exceeded errors and other storage exceptions.

```javascript
// Save operation pattern
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to Local Storage:', error);
    // Optionally show user notification
  }
}

// Load operation pattern
function loadFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Failed to load from Local Storage:', error);
    return defaultValue;
  }
}
```

**Storage Keys**
- Tasks: `"productivity-dashboard-tasks"`
- Quick Links: `"productivity-dashboard-links"`

**Data Synchronization**
- All modifications immediately persist to Local Storage
- No debouncing or batching (simple immediate writes)
- Page load triggers data retrieval from Local Storage
- No cross-tab synchronization (each tab operates independently)

### DOM Manipulation Approach

**Principles**
- Direct DOM manipulation using vanilla JavaScript
- Event delegation for dynamically created elements where appropriate
- Minimal reflows by batching DOM updates
- Clear separation between data updates and UI updates

**Rendering Strategy**
- Full re-render for task list and quick links on data changes
- Incremental updates for timer and greeting displays
- Use `innerHTML` for simple text updates
- Use `createElement` and `appendChild` for complex structures

**Event Handling**
- Event listeners attached during initialization
- Form submissions use `preventDefault()` to avoid page reload
- Event delegation for delete/edit buttons on dynamic elements
- Single interval for timer updates (cleared on stop/reset)
- Single interval for time/greeting updates (never cleared)

**Performance Considerations**
- Limit DOM queries by caching element references
- Use `requestAnimationFrame` if needed for smooth animations
- Avoid layout thrashing by reading then writing DOM properties
- Keep task and link lists reasonable (< 100 items for optimal performance)


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Time Format Correctness

For any Date object, the formatted time string should be in 12-hour format (1-12), include minutes with leading zeros, and include either "AM" or "PM".

**Validates: Requirements 1.1**

### Property 2: Date Format Completeness

For any Date object, the formatted date string should contain the day of week name, month name, day number, and four-digit year.

**Validates: Requirements 1.2**

### Property 3: Greeting Correctness for All Hours

For any hour value (0-23), the greeting function should return:
- "Good Morning" for hours 5-11
- "Good Afternoon" for hours 12-16
- "Good Evening" for hours 17-20
- "Good Night" for hours 21-23 and 0-4

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 4: Timer Format Correctness

For any number of seconds (0-1500), the formatted timer string should be in MM:SS format with leading zeros (e.g., "25:00", "09:05", "00:00").

**Validates: Requirements 3.2**

### Property 5: Timer Reset Idempotence

For any timer state, calling reset should set remaining time to 1500 seconds and set isRunning to false. Calling reset multiple times should produce the same result.

**Validates: Requirements 3.5**

### Property 6: Task Creation with Valid Input

For any non-empty, non-whitespace string, creating a task should result in a task list that is one item longer and contains a task with that text and completed status of false.

**Validates: Requirements 4.2, 4.3**

### Property 7: Empty Input Rejection

For any string composed entirely of whitespace characters (including empty string), attempting to create a task or quick link should not modify the existing list.

**Validates: Requirements 4.4, 8.3, 8.4**

### Property 8: Task Order Preservation

For any sequence of task creation operations, the resulting task list should maintain the order in which tasks were created (sorted by createdAt timestamp).

**Validates: Requirements 4.5**

### Property 9: Task Completion Toggle Round-Trip

For any task, toggling its completion status twice should return it to its original completion state.

**Validates: Requirements 5.2, 5.3, 5.4**

### Property 10: Task Edit Preservation

For any task and any new non-empty text, editing the task should update only the text field while preserving the id, completed status, and createdAt timestamp.

**Validates: Requirements 6.3**

### Property 11: Task Edit Cancellation

For any task in edit mode, canceling the edit should result in the task having the same text as before edit mode was entered.

**Validates: Requirements 6.4**

### Property 12: Task Deletion Reduces List Size

For any task list containing at least one task, deleting a task should reduce the list length by exactly one and the deleted task should not appear in the resulting list.

**Validates: Requirements 6.6**

### Property 13: Task Storage Round-Trip

For any array of valid Task objects, saving to Local Storage and then loading should produce an equivalent array with the same tasks in the same order.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 14: Quick Link Creation with Valid Input

For any non-empty, non-whitespace name and URL strings, creating a quick link should result in a link list that is one item longer and contains a link with that name and URL.

**Validates: Requirements 8.2**

### Property 15: Quick Link Rendering Completeness

For any QuickLink object, the rendered HTML element should contain the link name as visible text and include both a clickable button and a delete control.

**Validates: Requirements 8.5, 8.6**

### Property 16: Quick Link Deletion Reduces List Size

For any link list containing at least one link, deleting a link should reduce the list length by exactly one and the deleted link should not appear in the resulting list.

**Validates: Requirements 8.7**

### Property 17: Quick Link Opens in New Tab

For any QuickLink with a valid URL, clicking the link button should call window.open with the URL and '_blank' target parameter.

**Validates: Requirements 9.1, 9.2**

### Property 18: Quick Link Storage Round-Trip

For any array of valid QuickLink objects, saving to Local Storage and then loading should produce an equivalent array with the same links in the same order.

**Validates: Requirements 10.1, 10.2, 10.3**

### Property 19: Task Rendering Includes Controls

For any Task object, the rendered HTML element should include a completion checkbox, text display, edit button, and delete button.

**Validates: Requirements 5.1, 6.1, 6.5**

## Error Handling

### Local Storage Errors

**Quota Exceeded**
- Scenario: User's Local Storage quota is full
- Handling: Wrap all `localStorage.setItem()` calls in try-catch blocks
- User Feedback: Log error to console; optionally display notification
- Graceful Degradation: Application continues to function but data is not persisted

**Parse Errors**
- Scenario: Corrupted data in Local Storage
- Handling: Wrap all `JSON.parse()` calls in try-catch blocks
- Recovery: Return empty array as default value
- User Impact: User loses saved data but can continue using the application

**Storage Unavailable**
- Scenario: Browser has Local Storage disabled or in private mode
- Handling: Check for `localStorage` availability before use
- Fallback: Application functions but data is not persisted across sessions

### Input Validation Errors

**Empty Task Text**
- Validation: Trim input and check for empty string
- Handling: Prevent task creation, do not clear input field
- User Feedback: No error message (silent validation)

**Empty Link Fields**
- Validation: Trim both name and URL inputs
- Handling: Prevent link creation if either field is empty
- User Feedback: No error message (silent validation)

### Timer Edge Cases

**Timer at Zero**
- Scenario: Timer reaches 00:00
- Handling: Stop countdown, clear interval, remain at 00:00
- User Action: User must click reset to restart

**Multiple Start Clicks**
- Scenario: User clicks start button while timer is running
- Handling: Check `isRunning` flag before starting new interval
- Prevention: Prevent multiple intervals from running simultaneously

### DOM Manipulation Errors

**Missing Elements**
- Scenario: Required DOM elements not found
- Handling: Check for element existence before manipulation
- Recovery: Log error and skip operation
- Prevention: Ensure HTML structure matches JavaScript expectations

**Event Listener Errors**
- Scenario: Error in event handler function
- Handling: Wrap handler logic in try-catch where appropriate
- Recovery: Log error, prevent application crash
- User Impact: Specific operation fails but application remains functional

## Testing Strategy

### Overview

The testing strategy employs a dual approach combining unit tests for specific examples and edge cases with property-based tests for universal correctness guarantees. This ensures both concrete behavior validation and comprehensive input coverage.

### Property-Based Testing

**Framework Selection**
- JavaScript: Use `fast-check` library for property-based testing
- Installation: `npm install --save-dev fast-check`
- Integration: Works with standard test runners (Jest, Mocha, Vitest)

**Configuration**
- Minimum 100 iterations per property test (configured via `fc.assert` options)
- Each property test must include a comment tag referencing the design document
- Tag format: `// Feature: productivity-dashboard, Property {number}: {property_text}`

**Property Test Coverage**

Each correctness property (1-19) should be implemented as a property-based test:

1. Time formatting with random Date objects
2. Date formatting with random Date objects
3. Greeting function with random hours (0-23)
4. Timer formatting with random seconds (0-1500)
5. Timer reset with random timer states
6. Task creation with random valid text strings
7. Empty input rejection with random whitespace strings
8. Task ordering with random task creation sequences
9. Task completion toggle with random tasks
10. Task editing with random tasks and new text
11. Task edit cancellation with random tasks
12. Task deletion with random task lists
13. Task storage round-trip with random task arrays
14. Quick link creation with random valid inputs
15. Quick link rendering with random link objects
16. Quick link deletion with random link lists
17. Quick link opening with random URLs
18. Quick link storage round-trip with random link arrays
19. Task rendering with random task objects

**Generator Strategies**

```javascript
// Example generators for property tests
const arbTask = fc.record({
  id: fc.string(),
  text: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
  completed: fc.boolean(),
  createdAt: fc.integer({ min: 0 })
});

const arbQuickLink = fc.record({
  id: fc.string(),
  name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
  url: fc.webUrl()
});

const arbWhitespace = fc.string().filter(s => s.trim().length === 0);

const arbHour = fc.integer({ min: 0, max: 23 });

const arbSeconds = fc.integer({ min: 0, max: 1500 });
```

### Unit Testing

**Framework**
- Use Jest, Mocha, or Vitest for unit testing
- Focus on specific examples, edge cases, and integration points

**Unit Test Coverage**

**Greeting Module**
- Example: Verify "Good Morning" at 9:00 AM
- Example: Verify "Good Afternoon" at 2:00 PM
- Edge case: Verify greeting at boundary times (4:59 AM, 5:00 AM, 11:59 AM, 12:00 PM)

**Focus Timer**
- Example: Verify initial state is 25:00
- Example: Verify timer displays 00:00 when at zero
- Edge case: Verify timer stops at zero and doesn't go negative
- Integration: Verify start/stop/reset button interactions

**Task List**
- Example: Verify empty list displays correctly
- Example: Verify single task creation and display
- Edge case: Verify empty storage returns empty array
- Edge case: Verify corrupted JSON in storage returns empty array
- Integration: Verify task CRUD operations update DOM correctly

**Quick Links Panel**
- Example: Verify empty list displays correctly
- Example: Verify single link creation and display
- Edge case: Verify empty storage returns empty array
- Edge case: Verify window.open is called with correct parameters
- Integration: Verify link CRUD operations update DOM correctly

**Local Storage Integration**
- Example: Verify save and load operations
- Edge case: Verify quota exceeded error handling
- Edge case: Verify parse error handling
- Edge case: Verify missing localStorage object handling

### Test Organization

```
tests/
├── unit/
│   ├── greeting.test.js
│   ├── timer.test.js
│   ├── tasks.test.js
│   ├── quicklinks.test.js
│   └── storage.test.js
└── properties/
    ├── greeting.properties.test.js
    ├── timer.properties.test.js
    ├── tasks.properties.test.js
    ├── quicklinks.properties.test.js
    └── storage.properties.test.js
```

### Testing Balance

- Property tests handle comprehensive input coverage (100+ random inputs per property)
- Unit tests focus on specific examples that demonstrate correct behavior
- Unit tests validate edge cases and error conditions
- Unit tests verify integration between components and DOM
- Both approaches are necessary: property tests catch general correctness issues, unit tests catch specific bugs

### Manual Testing Checklist

The following aspects require manual testing:

- Visual design consistency and aesthetics (Req 12.1, 12.3)
- Font size readability (Req 12.2)
- Performance and responsiveness feel (Req 11.1, 11.2, 11.3)
- Cross-browser compatibility (Req 13.1-13.4)
- Time update behavior (Req 1.3, 2.5, 3.7)
- User experience and interaction flow

### Continuous Integration

- Run all tests on every commit
- Fail build if any property test fails
- Fail build if any unit test fails
- Generate coverage reports (aim for >80% code coverage)
- Run tests in multiple browser environments using tools like Playwright or Puppeteer
