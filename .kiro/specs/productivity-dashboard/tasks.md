# Implementation Plan: Productivity Dashboard

## Overview

This plan implements a client-side productivity dashboard using vanilla JavaScript, HTML, and CSS. The application includes a greeting module with time/date display, a 25-minute focus timer, a task management system with Local Storage persistence, and a quick links panel. Implementation follows a modular approach with incremental validation through property-based and unit tests.

## Tasks

- [x] 1. Set up project structure and HTML foundation
  - Create directory structure (css/, js/)
  - Create index.html with semantic HTML5 structure
  - Add DOM elements for all four components (greeting, timer, tasks, quick links)
  - Include proper meta tags and viewport settings
  - Link stylesheet and JavaScript file
  - _Requirements: 12.4, 12.5, 13.5_

- [x] 2. Implement greeting module with time and date display
  - [x] 2.1 Create greeting module initialization and time formatting functions
    - Implement `initGreeting()` to start time updates
    - Implement `updateTimeAndGreeting()` to update all displays
    - Implement time formatting in 12-hour format with AM/PM
    - Implement date formatting with day, month, date, year
    - Set up setInterval for 1-second updates
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 2.2 Write property tests for time and date formatting
    - **Property 1: Time Format Correctness**
    - **Validates: Requirements 1.1**
    - **Property 2: Date Format Completeness**
    - **Validates: Requirements 1.2**

  - [x] 2.3 Implement time-based greeting logic
    - Implement `getGreeting(hour)` function
    - Return correct greeting based on hour ranges (5-11, 12-16, 17-20, 21-4)
    - Integrate greeting updates into `updateTimeAndGreeting()`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 2.4 Write property test for greeting correctness
    - **Property 3: Greeting Correctness for All Hours**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

  - [ ]* 2.5 Write unit tests for greeting module
    - Test specific greeting examples (9 AM, 2 PM, 7 PM, 11 PM)
    - Test boundary times (4:59 AM, 5:00 AM, 11:59 AM, 12:00 PM)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Implement focus timer functionality
  - [x] 3.1 Create timer state management and display functions
    - Initialize timer state (remainingSeconds: 1500, isRunning: false)
    - Implement `formatTime(seconds)` to convert seconds to MM:SS
    - Implement `updateTimerDisplay()` to update DOM
    - Cache DOM element references for timer display and buttons
    - _Requirements: 3.1, 3.2_

  - [ ]* 3.2 Write property test for timer formatting
    - **Property 4: Timer Format Correctness**
    - **Validates: Requirements 3.2**

  - [x] 3.3 Implement timer control functions
    - Implement `startTimer()` with interval management
    - Implement `stopTimer()` to pause and clear interval
    - Implement `resetTimer()` to return to 1500 seconds
    - Handle timer reaching 00:00 (stop at zero)
    - Attach event listeners to start/stop/reset buttons
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 3.4 Write property test for timer reset
    - **Property 5: Timer Reset Idempotence**
    - **Validates: Requirements 3.5**

  - [ ]* 3.5 Write unit tests for timer functionality
    - Test initial state is 25:00
    - Test timer displays 00:00 when at zero
    - Test timer stops at zero without going negative
    - Test start/stop/reset button interactions
    - Test multiple start clicks don't create multiple intervals
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6_

- [x] 4. Checkpoint - Verify greeting and timer modules
  - Ensure all tests pass, ask the user if questions arise.


- [x] 5. Implement Local Storage utility functions
  - [x] 5.1 Create storage helper functions with error handling
    - Implement `saveToStorage(key, data)` with try-catch for quota errors
    - Implement `loadFromStorage(key, defaultValue)` with try-catch for parse errors
    - Use storage keys: "productivity-dashboard-tasks" and "productivity-dashboard-links"
    - Return default values on errors
    - _Requirements: 7.1, 7.2, 7.3, 7.5, 10.1, 10.2, 10.3_

  - [ ]* 5.2 Write unit tests for storage error handling
    - Test quota exceeded error handling
    - Test JSON parse error handling
    - Test missing localStorage object handling
    - _Requirements: 7.1, 7.5, 10.1, 10.3_

- [x] 6. Implement task list data model and core functions
  - [x] 6.1 Create task data model and CRUD functions
    - Define Task interface: {id, text, completed, createdAt}
    - Implement `loadTasks()` to retrieve from Local Storage
    - Implement `saveTasks(tasks)` to persist to Local Storage
    - Implement `addTask(text)` with validation and ID generation
    - Implement `toggleTaskComplete(taskId)` to update completion status
    - Implement `editTask(taskId, newText)` to update task text
    - Implement `deleteTask(taskId)` to remove task
    - _Requirements: 4.2, 4.3, 4.4, 5.2, 5.3, 5.4, 6.3, 6.4, 6.6, 7.1, 7.2, 7.3, 7.4_

  - [ ]* 6.2 Write property tests for task operations
    - **Property 6: Task Creation with Valid Input**
    - **Validates: Requirements 4.2, 4.3**
    - **Property 7: Empty Input Rejection**
    - **Validates: Requirements 4.4**
    - **Property 8: Task Order Preservation**
    - **Validates: Requirements 4.5**
    - **Property 9: Task Completion Toggle Round-Trip**
    - **Validates: Requirements 5.2, 5.3, 5.4**
    - **Property 10: Task Edit Preservation**
    - **Validates: Requirements 6.3**
    - **Property 11: Task Edit Cancellation**
    - **Validates: Requirements 6.4**
    - **Property 12: Task Deletion Reduces List Size**
    - **Validates: Requirements 6.6**
    - **Property 13: Task Storage Round-Trip**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- [x] 7. Implement task list UI rendering and interactions
  - [x] 7.1 Create task rendering functions
    - Implement `renderTask(task)` to create task DOM element
    - Include checkbox, text display, edit button, delete button
    - Implement `renderTasks(tasks)` to render full task list
    - Cache DOM element references for task input and container
    - _Requirements: 4.3, 5.1, 6.1, 6.5_

  - [ ]* 7.2 Write property test for task rendering
    - **Property 19: Task Rendering Includes Controls**
    - **Validates: Requirements 5.1, 6.1, 6.5**

  - [x] 7.3 Implement task list initialization and form handling
    - Implement `initTaskList()` to load and render tasks
    - Attach form submit listener with preventDefault
    - Validate input (trim and check for empty string)
    - Clear input field after successful task creation
    - Attach event listeners for checkbox, edit, delete buttons
    - _Requirements: 4.1, 4.2, 4.4, 4.6_

  - [x] 7.4 Implement task edit mode functionality
    - Add edit mode state management for tasks
    - Show editable input field when edit button clicked
    - Implement save and cancel edit actions
    - Preserve original text on cancel
    - Update task text and save to storage on save
    - _Requirements: 6.2, 6.3, 6.4_

  - [ ]* 7.5 Write unit tests for task list functionality
    - Test empty list displays correctly
    - Test single task creation and display
    - Test empty storage returns empty array
    - Test corrupted JSON returns empty array
    - Test task CRUD operations update DOM correctly
    - Test edit mode save and cancel behavior
    - _Requirements: 4.2, 4.3, 4.4, 6.2, 6.3, 6.4, 7.6_

- [x] 8. Implement quick links data model and core functions
  - [x] 8.1 Create quick link data model and CRUD functions
    - Define QuickLink interface: {id, name, url}
    - Implement `loadLinks()` to retrieve from Local Storage
    - Implement `saveLinks(links)` to persist to Local Storage
    - Implement `addLink(name, url)` with validation and ID generation
    - Implement `deleteLink(linkId)` to remove link
    - Implement `openLink(url)` using window.open with '_blank' target
    - _Requirements: 8.2, 8.3, 8.4, 8.7, 9.1, 9.2, 10.1, 10.2_

  - [ ]* 8.2 Write property tests for quick link operations
    - **Property 7: Empty Input Rejection** (for links)
    - **Validates: Requirements 8.3, 8.4**
    - **Property 14: Quick Link Creation with Valid Input**
    - **Validates: Requirements 8.2**
    - **Property 16: Quick Link Deletion Reduces List Size**
    - **Validates: Requirements 8.7**
    - **Property 17: Quick Link Opens in New Tab**
    - **Validates: Requirements 9.1, 9.2**
    - **Property 18: Quick Link Storage Round-Trip**
    - **Validates: Requirements 10.1, 10.2, 10.3**

- [x] 9. Implement quick links UI rendering and interactions
  - [x] 9.1 Create quick link rendering functions
    - Implement `renderLink(link)` to create link button DOM element
    - Include link button with name and delete button
    - Implement `renderLinks(links)` to render full links list
    - Cache DOM element references for link inputs and container
    - _Requirements: 8.5, 8.6_

  - [ ]* 9.2 Write property test for quick link rendering
    - **Property 15: Quick Link Rendering Completeness**
    - **Validates: Requirements 8.5, 8.6**

  - [x] 9.3 Implement quick links initialization and form handling
    - Implement `initQuickLinks()` to load and render links
    - Attach form submit listener with preventDefault
    - Validate both name and URL inputs (trim and check for empty)
    - Clear input fields after successful link creation
    - Attach event listeners for link buttons and delete buttons
    - Ensure links open in new tab (window.open with '_blank')
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.1, 9.2_

  - [ ]* 9.4 Write unit tests for quick links functionality
    - Test empty list displays correctly
    - Test single link creation and display
    - Test empty storage returns empty array
    - Test window.open called with correct parameters
    - Test link CRUD operations update DOM correctly
    - _Requirements: 8.2, 8.7, 9.1, 9.2, 10.3, 10.4_

- [x] 10. Checkpoint - Verify task list and quick links modules
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create CSS styling for all components
  - [x] 11.1 Implement base styles and layout
    - Create css/styles.css file
    - Define consistent color scheme and typography
    - Set minimum font size to 14px for body text
    - Implement responsive layout with appropriate spacing
    - Style greeting module (time, date, greeting text)
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 11.2 Style focus timer component
    - Style timer display (MM:SS format)
    - Style start/stop/reset buttons with clear visual states
    - Add hover and active states for buttons
    - _Requirements: 12.1, 12.3_

  - [x] 11.3 Style task list component
    - Style task input form
    - Style task items with checkbox, text, and buttons
    - Add visual distinction for completed tasks
    - Style edit mode input field
    - Add hover states for interactive elements
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 11.4 Style quick links panel
    - Style link input form (name and URL fields)
    - Style link buttons with clear clickable appearance
    - Style delete buttons for links
    - Add hover and active states
    - _Requirements: 12.1, 12.2, 12.3_

- [x] 12. Wire all components together and initialize application
  - [x] 12.1 Create main application initialization
    - Implement DOMContentLoaded event listener
    - Call initGreeting() to start time updates
    - Call initTimer() to set up focus timer
    - Call initTaskList() to load and render tasks
    - Call initQuickLinks() to load and render links
    - Ensure all components initialize without errors
    - _Requirements: 1.3, 2.5, 3.7, 4.1, 7.5, 8.1, 10.3, 10.4_

  - [ ]* 12.2 Write integration tests
    - Test all components initialize correctly on page load
    - Test data persistence across simulated page reloads
    - Test component independence (no cross-component interference)
    - _Requirements: 7.5, 10.3, 11.1, 11.2_

- [x] 13. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.


## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across random inputs
- Unit tests validate specific examples, edge cases, and integration points
- Checkpoints ensure incremental validation at key milestones
- All property tests should use fast-check library with minimum 100 iterations
- Each property test must include comment tag: `// Feature: productivity-dashboard, Property {N}: {title}`
- Implementation uses vanilla JavaScript (ES6+) with no frameworks or build tools
- All data persistence uses browser Local Storage API
- Application is entirely client-side with no backend dependencies

## Testing Setup

To run property-based tests, install fast-check:
```bash
npm install --save-dev fast-check
```

Choose a test runner (Jest, Mocha, or Vitest) and configure accordingly.

## Manual Testing Checklist

The following aspects require manual verification after implementation:
- Visual design consistency and color scheme (Req 12.1)
- Font size readability across different screens (Req 12.2)
- Visual hierarchy and spacing (Req 12.3)
- Performance and responsiveness feel (Req 11.1, 11.2, 11.3)
- Cross-browser compatibility: Chrome, Firefox, Edge, Safari (Req 13.1-13.4)
- Time updates every second (Req 1.3, 2.5, 3.7)
- User experience and interaction flow
