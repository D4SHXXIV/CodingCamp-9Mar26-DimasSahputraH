// Productivity Dashboard Application
// All application logic will be contained in this file

// ============================================
// LOCAL STORAGE UTILITY FUNCTIONS
// ============================================

/**
 * Saves data to Local Storage with error handling
 * @param {string} key - Storage key
 * @param {*} data - Data to save (will be JSON stringified)
 */
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to Local Storage:', error);
    // Handle quota exceeded or other storage errors
    if (error.name === 'QuotaExceededError') {
      console.error('Local Storage quota exceeded');
    }
  }
}

/**
 * Loads data from Local Storage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value to return on error or missing data
 * @returns {*} - Parsed data from storage or default value
 */
function loadFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Failed to load from Local Storage:', error);
    // Handle JSON parse errors or missing localStorage
    return defaultValue;
  }
}

// ============================================
// GREETING MODULE
// ============================================

/**
 * Returns the appropriate greeting based on the hour of day
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} - Greeting text
 */
function getGreeting(hour) {
  if (hour >= 5 && hour <= 11) {
    return 'Good Morning';
  } else if (hour >= 12 && hour <= 16) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour <= 20) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}

/**
 * Updates the time, date, and greeting displays
 */
function updateTimeAndGreeting() {
  const now = new Date();
  
  // Format time in 12-hour format with AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  
  // Format date with day, month, date, year
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();
  const dateStr = `${dayName}, ${monthName} ${date}, ${year}`;
  
  // Get greeting based on current hour
  const greeting = getGreeting(now.getHours());
  
  // Update DOM elements
  const timeDisplay = document.getElementById('time-display');
  const dateDisplay = document.getElementById('date-display');
  const greetingText = document.getElementById('greeting-text');
  
  if (timeDisplay) timeDisplay.textContent = timeStr;
  if (dateDisplay) dateDisplay.textContent = dateStr;
  if (greetingText) greetingText.textContent = greeting;
}

/**
 * Initializes the greeting module
 * Starts the interval for updating time and greeting every second
 */
function initGreeting() {
  // Update immediately on initialization
  updateTimeAndGreeting();
  
  // Set up interval to update every second
  setInterval(updateTimeAndGreeting, 1000);
}

// ============================================
// FOCUS TIMER MODULE
// ============================================

// Timer state
const timerState = {
  remainingSeconds: 1500, // 25 minutes in seconds
  isRunning: false,
  intervalId: null
};

// Cache DOM element references
let timerDisplay;
let timerStartBtn;
let timerStopBtn;
let timerResetBtn;

/**
 * Formats seconds into MM:SS format
 * @param {number} seconds - Number of seconds to format
 * @returns {string} - Formatted time string (MM:SS)
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secsStr = secs < 10 ? '0' + secs : secs;
  return `${minutesStr}:${secsStr}`;
}

/**
 * Updates the timer display in the DOM
 */
function updateTimerDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(timerState.remainingSeconds);
  }
}

/**
 * Starts the timer countdown
 */
function startTimer() {
  // Don't start if already running
  if (timerState.isRunning) {
    return;
  }
  
  timerState.isRunning = true;
  
  // Set up interval to countdown every second
  timerState.intervalId = setInterval(() => {
    if (timerState.remainingSeconds > 0) {
      timerState.remainingSeconds--;
      updateTimerDisplay();
    } else {
      // Timer reached 00:00, stop counting
      stopTimer();
    }
  }, 1000);
}

/**
 * Stops/pauses the timer
 */
function stopTimer() {
  timerState.isRunning = false;
  
  if (timerState.intervalId !== null) {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }
}

/**
 * Resets the timer to 25 minutes
 */
function resetTimer() {
  stopTimer();
  timerState.remainingSeconds = 1500;
  updateTimerDisplay();
}

/**
 * Initializes the focus timer module
 * Caches DOM elements and attaches event listeners
 */
function initTimer() {
  // Cache DOM element references
  timerDisplay = document.getElementById('timer-display');
  timerStartBtn = document.getElementById('timer-start');
  timerStopBtn = document.getElementById('timer-stop');
  timerResetBtn = document.getElementById('timer-reset');
  
  // Initialize display
  updateTimerDisplay();
  
  // Attach event listeners
  if (timerStartBtn) {
    timerStartBtn.addEventListener('click', startTimer);
  }
  
  if (timerStopBtn) {
    timerStopBtn.addEventListener('click', stopTimer);
  }
  
  if (timerResetBtn) {
    timerResetBtn.addEventListener('click', resetTimer);
  }
}

// ============================================
// TASK LIST MODULE
// ============================================

/**
 * Task Data Model
 * @typedef {Object} Task
 * @property {string} id - Unique identifier (timestamp-based)
 * @property {string} text - Task description
 * @property {boolean} completed - Completion status
 * @property {number} createdAt - Timestamp (milliseconds since epoch)
 */

// Storage key for tasks
const TASKS_STORAGE_KEY = 'productivity-dashboard-tasks';

// In-memory task list
let tasks = [];

/**
 * Loads tasks from Local Storage
 * @returns {Task[]} - Array of tasks from storage, or empty array if none exist
 */
function loadTasks() {
  return loadFromStorage(TASKS_STORAGE_KEY, []);
}

/**
 * Saves tasks to Local Storage
 * @param {Task[]} tasksToSave - Array of tasks to persist
 */
function saveTasks(tasksToSave) {
  saveToStorage(TASKS_STORAGE_KEY, tasksToSave);
}

/**
 * Adds a new task to the task list
 * @param {string} text - Task description text
 * @returns {Task|null} - The created task object, or null if validation fails
 */
function addTask(text) {
  // Validate input: reject empty or whitespace-only text
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return null;
  }
  
  // Create new task object
  const timestamp = Date.now();
  const newTask = {
    id: `task-${timestamp}`,
    text: trimmedText,
    completed: false,
    createdAt: timestamp
  };
  
  // Add to tasks array
  tasks.push(newTask);
  
  // Persist to Local Storage
  saveTasks(tasks);
  
  return newTask;
}

/**
 * Toggles the completion status of a task
 * @param {string} taskId - ID of the task to toggle
 * @returns {boolean} - True if task was found and toggled, false otherwise
 */
function toggleTaskComplete(taskId) {
  // Find task by ID
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return false;
  }
  
  // Toggle completed status
  task.completed = !task.completed;
  
  // Persist to Local Storage
  saveTasks(tasks);
  
  return true;
}

/**
 * Edits the text of an existing task
 * @param {string} taskId - ID of the task to edit
 * @param {string} newText - New text for the task
 * @returns {boolean} - True if task was found and updated, false otherwise
 */
function editTask(taskId, newText) {
  // Validate input: reject empty or whitespace-only text
  const trimmedText = newText.trim();
  if (trimmedText.length === 0) {
    return false;
  }
  
  // Find task by ID
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return false;
  }
  
  // Update text
  task.text = trimmedText;
  
  // Persist to Local Storage
  saveTasks(tasks);
  
  return true;
}

/**
 * Deletes a task from the task list
 * @param {string} taskId - ID of the task to delete
 * @returns {boolean} - True if task was found and deleted, false otherwise
 */
function deleteTask(taskId) {
  // Find index of task
  const index = tasks.findIndex(t => t.id === taskId);
  
  if (index === -1) {
    return false;
  }
  
  // Remove task from array
  tasks.splice(index, 1);
  
  // Persist to Local Storage
  saveTasks(tasks);
  
  return true;
}
// Cache DOM element references
let taskInput;
let taskForm;
let taskList;

/**
 * Renders a single task as a DOM element
 * @param {Task} task - Task object to render
 * @returns {HTMLElement} - DOM element representing the task
 */
function renderTask(task) {
  // Create task item container
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  taskItem.dataset.taskId = task.id;

  // Create checkbox for completion status
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('click', () => {
    toggleTaskComplete(task.id);
    renderTasks(tasks);
  });

  // Create text display/edit container
  const textContainer = document.createElement('span');
  textContainer.className = 'task-text';
  textContainer.textContent = task.text;
  if (task.completed) {
    textContainer.style.textDecoration = 'line-through';
  }

  // Create edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'task-edit-btn';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    enterEditMode(task.id);
  });

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'task-delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
    renderTasks(tasks);
  });

  // Assemble task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(textContainer);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

/**
 * Renders the full task list to the DOM
 * @param {Task[]} tasksToRender - Array of tasks to render
 */
function renderTasks(tasksToRender) {
  // Clear existing task list
  if (taskList) {
    taskList.innerHTML = '';

    // Render each task
    tasksToRender.forEach(task => {
      const taskElement = renderTask(task);
      taskList.appendChild(taskElement);
    });
  }
}

/**
 * Enters edit mode for a specific task
 * @param {string} taskId - ID of the task to edit
 */
function enterEditMode(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
  if (!taskItem) return;

  // Store original text for cancel functionality
  const originalText = task.text;

  // Clear task item and rebuild with edit controls
  taskItem.innerHTML = '';

  // Create edit input field
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-edit-input';
  editInput.value = task.text;

  // Create save button
  const saveBtn = document.createElement('button');
  saveBtn.className = 'task-save-btn';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    const newText = editInput.value.trim();
    if (newText.length > 0) {
      editTask(taskId, newText);
      renderTasks(tasks);
    }
  });

  // Create cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'task-cancel-btn';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    // Restore original text (no changes to data)
    renderTasks(tasks);
  });

  // Assemble edit mode UI
  taskItem.appendChild(editInput);
  taskItem.appendChild(saveBtn);
  taskItem.appendChild(cancelBtn);

  // Focus the input field
  editInput.focus();
}

/**
 * Initializes the task list module
 * Loads tasks from storage, renders them, and attaches event listeners
 */
function initTaskList() {
  // Cache DOM element references
  taskInput = document.getElementById('task-input');
  taskForm = document.getElementById('task-form');
  taskList = document.getElementById('task-list');

  // Load tasks from Local Storage
  tasks = loadTasks();

  // Render initial task list
  renderTasks(tasks);

  // Attach form submit listener
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get input value and validate
      const text = taskInput.value.trim();
      if (text.length === 0) {
        return; // Don't create empty tasks
      }

      // Add task
      addTask(text);

      // Clear input field
      taskInput.value = '';

      // Re-render task list
      renderTasks(tasks);
    });
  }
}

// ============================================
// QUICK LINKS MODULE
// ============================================

/**
 * QuickLink Data Model
 * @typedef {Object} QuickLink
 * @property {string} id - Unique identifier (timestamp-based)
 * @property {string} name - Display name for the link
 * @property {string} url - Target URL
 */

// Storage key for quick links
const LINKS_STORAGE_KEY = 'productivity-dashboard-links';

// In-memory links list
let links = [];

/**
 * Loads quick links from Local Storage
 * @returns {QuickLink[]} - Array of links from storage, or empty array if none exist
 */
function loadLinks() {
  return loadFromStorage(LINKS_STORAGE_KEY, []);
}

/**
 * Saves quick links to Local Storage
 * @param {QuickLink[]} linksToSave - Array of links to persist
 */
function saveLinks(linksToSave) {
  saveToStorage(LINKS_STORAGE_KEY, linksToSave);
}

/**
 * Adds a new quick link to the links list
 * @param {string} name - Display name for the link
 * @param {string} url - Target URL
 * @returns {QuickLink|null} - The created link object, or null if validation fails
 */
function addLink(name, url) {
  // Validate input: reject empty or whitespace-only name or url
  const trimmedName = name.trim();
  const trimmedUrl = url.trim();

  if (trimmedName.length === 0 || trimmedUrl.length === 0) {
    return null;
  }

  // Create new link object
  const timestamp = Date.now();
  const newLink = {
    id: `link-${timestamp}`,
    name: trimmedName,
    url: trimmedUrl
  };

  // Add to links array
  links.push(newLink);

  // Persist to Local Storage
  saveLinks(links);

  return newLink;
}

/**
 * Deletes a quick link from the links list
 * @param {string} linkId - ID of the link to delete
 * @returns {boolean} - True if link was found and deleted, false otherwise
 */
function deleteLink(linkId) {
  // Find index of link
  const index = links.findIndex(l => l.id === linkId);

  if (index === -1) {
    return false;
  }

  // Remove link from array
  links.splice(index, 1);

  // Persist to Local Storage
  saveLinks(links);

  return true;
}

/**
 * Opens a URL in a new browser tab
 * @param {string} url - URL to open
 */
function openLink(url) {
  window.open(url, '_blank');
}

// Cache DOM element references
let linkNameInput;
let linkUrlInput;
let linkForm;
let linksContainer;

/**
 * Renders a single quick link as a DOM element
 * @param {QuickLink} link - Link object to render
 * @returns {HTMLElement} - DOM element representing the link button
 */
function renderLink(link) {
  // Create link button container
  const linkButton = document.createElement('div');
  linkButton.className = 'link-button';
  linkButton.dataset.linkId = link.id;

  // Create clickable button with link name
  const button = document.createElement('button');
  button.className = 'link-btn';
  button.textContent = link.name;
  button.addEventListener('click', () => {
    openLink(link.url);
  });

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'link-delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    deleteLink(link.id);
    renderLinks(links);
  });

  // Assemble link button
  linkButton.appendChild(button);
  linkButton.appendChild(deleteBtn);

  return linkButton;
}

/**
 * Renders the full links list to the DOM
 * @param {QuickLink[]} linksToRender - Array of links to render
 */
function renderLinks(linksToRender) {
  // Clear existing links container
  if (linksContainer) {
    linksContainer.innerHTML = '';

    // Render each link
    linksToRender.forEach(link => {
      const linkElement = renderLink(link);
      linksContainer.appendChild(linkElement);
    });
  }
}

/**
 * Initializes the quick links module
 * Loads links from storage, renders them, and attaches event listeners
 */
function initQuickLinks() {
  // Cache DOM element references
  linkNameInput = document.getElementById('link-name-input');
  linkUrlInput = document.getElementById('link-url-input');
  linkForm = document.getElementById('link-form');
  linksContainer = document.getElementById('links-container');

  // Load links from Local Storage
  links = loadLinks();

  // Render initial links list
  renderLinks(links);

  // Attach form submit listener
  if (linkForm) {
    linkForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get input values and validate
      const name = linkNameInput.value.trim();
      const url = linkUrlInput.value.trim();

      // Validate both name and URL are non-empty
      if (name.length === 0 || url.length === 0) {
        return; // Don't create link if either field is empty
      }

      // Add link
      addLink(name, url);

      // Clear input fields
      linkNameInput.value = '';
      linkUrlInput.value = '';

      // Re-render links list
      renderLinks(links);
    });
  }
}


// ============================================
// APPLICATION INITIALIZATION
// ============================================

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Productivity Dashboard loaded');
  
  // Initialize greeting module
  initGreeting();
  
  // Initialize focus timer
  initTimer();
  
  // Initialize task list
  initTaskList();
  
  // Initialize quick links
  initQuickLinks();
});
