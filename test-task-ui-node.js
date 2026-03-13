// Node.js test for task UI functions
// This tests the core logic without DOM manipulation

// Mock localStorage
global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

// Mock console for cleaner output
const originalLog = console.log;
const originalError = console.error;
console.log = () => {};
console.error = () => {};

// Load the app.js functions (extract just the task functions)
const TASKS_STORAGE_KEY = 'productivity-dashboard-tasks';
let tasks = [];

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to Local Storage:', error);
  }
}

function loadFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Failed to load from Local Storage:', error);
    return defaultValue;
  }
}

function loadTasks() {
  return loadFromStorage(TASKS_STORAGE_KEY, []);
}

function saveTasks(tasksToSave) {
  saveToStorage(TASKS_STORAGE_KEY, tasksToSave);
}

function addTask(text) {
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return null;
  }
  
  const timestamp = Date.now();
  const newTask = {
    id: `task-${timestamp}`,
    text: trimmedText,
    completed: false,
    createdAt: timestamp
  };
  
  tasks.push(newTask);
  saveTasks(tasks);
  
  return newTask;
}

function toggleTaskComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return false;
  }
  
  task.completed = !task.completed;
  saveTasks(tasks);
  
  return true;
}

function editTask(taskId, newText) {
  const trimmedText = newText.trim();
  if (trimmedText.length === 0) {
    return false;
  }
  
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return false;
  }
  
  task.text = trimmedText;
  saveTasks(tasks);
  
  return true;
}

function deleteTask(taskId) {
  const index = tasks.findIndex(t => t.id === taskId);
  
  if (index === -1) {
    return false;
  }
  
  tasks.splice(index, 1);
  saveTasks(tasks);
  
  return true;
}

// Restore console
console.log = originalLog;
console.error = originalError;

// Test suite
console.log('Running Task UI Logic Tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Clear storage before tests
localStorage.clear();
tasks = [];

// Test 1: Add task with valid input
test('Add task with valid input creates task', () => {
  const task = addTask('Test task 1');
  assert(task !== null, 'Task should not be null');
  assert(task.text === 'Test task 1', 'Task text should match');
  assert(task.completed === false, 'Task should not be completed');
  assert(task.id, 'Task should have an ID');
  assert(task.createdAt, 'Task should have createdAt timestamp');
  assert(tasks.length === 1, 'Tasks array should have 1 item');
});

// Test 2: Add task with whitespace-only input
test('Add task with whitespace-only input returns null', () => {
  const task = addTask('   ');
  assert(task === null, 'Task should be null for whitespace input');
  assert(tasks.length === 1, 'Tasks array should still have 1 item');
});

// Test 3: Add task with empty input
test('Add task with empty input returns null', () => {
  const task = addTask('');
  assert(task === null, 'Task should be null for empty input');
  assert(tasks.length === 1, 'Tasks array should still have 1 item');
});

// Test 4: Add multiple tasks
test('Add multiple tasks maintains order', () => {
  addTask('Task 2');
  addTask('Task 3');
  assert(tasks.length === 3, 'Should have 3 tasks');
  assert(tasks[0].text === 'Test task 1', 'First task should be "Test task 1"');
  assert(tasks[1].text === 'Task 2', 'Second task should be "Task 2"');
  assert(tasks[2].text === 'Task 3', 'Third task should be "Task 3"');
});

// Test 5: Toggle task completion
test('Toggle task completion changes status', () => {
  const taskId = tasks[0].id;
  const result = toggleTaskComplete(taskId);
  assert(result === true, 'Toggle should return true');
  assert(tasks[0].completed === true, 'Task should be completed');
});

// Test 6: Toggle task completion twice
test('Toggle task completion twice returns to original state', () => {
  const taskId = tasks[0].id;
  toggleTaskComplete(taskId);
  assert(tasks[0].completed === false, 'Task should be incomplete after second toggle');
});

// Test 7: Toggle non-existent task
test('Toggle non-existent task returns false', () => {
  const result = toggleTaskComplete('non-existent-id');
  assert(result === false, 'Toggle should return false for non-existent task');
});

// Test 8: Edit task with valid text
test('Edit task with valid text updates task', () => {
  const taskId = tasks[1].id;
  const result = editTask(taskId, 'Updated Task 2');
  assert(result === true, 'Edit should return true');
  assert(tasks[1].text === 'Updated Task 2', 'Task text should be updated');
});

// Test 9: Edit task with whitespace-only text
test('Edit task with whitespace-only text returns false', () => {
  const taskId = tasks[1].id;
  const originalText = tasks[1].text;
  const result = editTask(taskId, '   ');
  assert(result === false, 'Edit should return false for whitespace input');
  assert(tasks[1].text === originalText, 'Task text should not change');
});

// Test 10: Edit non-existent task
test('Edit non-existent task returns false', () => {
  const result = editTask('non-existent-id', 'New text');
  assert(result === false, 'Edit should return false for non-existent task');
});

// Test 11: Delete task
test('Delete task removes it from array', () => {
  const taskId = tasks[2].id;
  const beforeCount = tasks.length;
  const result = deleteTask(taskId);
  assert(result === true, 'Delete should return true');
  assert(tasks.length === beforeCount - 1, 'Tasks array should be one item shorter');
  assert(!tasks.find(t => t.id === taskId), 'Deleted task should not exist in array');
});

// Test 12: Delete non-existent task
test('Delete non-existent task returns false', () => {
  const beforeCount = tasks.length;
  const result = deleteTask('non-existent-id');
  assert(result === false, 'Delete should return false for non-existent task');
  assert(tasks.length === beforeCount, 'Tasks array length should not change');
});

// Test 13: Save and load tasks
test('Save and load tasks preserves data', () => {
  saveTasks(tasks);
  const loadedTasks = loadTasks();
  assert(loadedTasks.length === tasks.length, 'Loaded tasks should have same length');
  assert(JSON.stringify(loadedTasks) === JSON.stringify(tasks), 'Loaded tasks should match saved tasks');
});

// Test 14: Load tasks from empty storage
test('Load tasks from empty storage returns empty array', () => {
  localStorage.clear();
  const loadedTasks = loadTasks();
  assert(Array.isArray(loadedTasks), 'Should return an array');
  assert(loadedTasks.length === 0, 'Should return empty array');
});

// Test 15: Task trimming
test('Add task trims whitespace from input', () => {
  tasks = [];
  const task = addTask('  Trimmed Task  ');
  assert(task.text === 'Trimmed Task', 'Task text should be trimmed');
});

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests Passed: ${passed}`);
console.log(`Tests Failed: ${failed}`);
console.log(`Total Tests: ${passed + failed}`);
console.log(`${'='.repeat(50)}`);

if (failed === 0) {
  console.log('\n✓ All tests passed!');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed');
  process.exit(1);
}
