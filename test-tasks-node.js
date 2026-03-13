/**
 * Node.js test script for Task CRUD functions
 * Simulates browser environment to test the functions
 */

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();

global.localStorage = localStorageMock;

// Copy the task functions from app.js
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

// Test functions
console.log('=== Task CRUD Functions Test ===\n');

// Test 1: Load empty tasks
console.log('Test 1: Load empty tasks');
tasks = loadTasks();
console.log(`✓ Loaded tasks: ${tasks.length} (expected: 0)`);
console.log('');

// Test 2: Add valid task
console.log('Test 2: Add valid task');
const task1 = addTask('Complete project documentation');
console.log(`✓ Task created: ${task1 !== null}`);
console.log(`  ID: ${task1.id}`);
console.log(`  Text: ${task1.text}`);
console.log(`  Completed: ${task1.completed}`);
console.log(`  CreatedAt: ${task1.createdAt}`);
console.log(`  Tasks count: ${tasks.length}`);
console.log('');

// Test 3: Add another task
console.log('Test 3: Add another task');
const task2 = addTask('Review pull requests');
console.log(`✓ Task created: ${task2 !== null}`);
console.log(`  Tasks count: ${tasks.length}`);
console.log('');

// Test 4: Add empty task (should fail)
console.log('Test 4: Add empty task');
const emptyTask = addTask('   ');
console.log(`✓ Empty task rejected: ${emptyTask === null}`);
console.log(`  Tasks count unchanged: ${tasks.length}`);
console.log('');

// Test 5: Toggle completion
console.log('Test 5: Toggle completion');
console.log(`  Before: ${task1.completed}`);
toggleTaskComplete(task1.id);
console.log(`  After first toggle: ${task1.completed}`);
toggleTaskComplete(task1.id);
console.log(`  After second toggle: ${task1.completed}`);
console.log('');

// Test 6: Edit task
console.log('Test 6: Edit task');
const originalText = task1.text;
const originalId = task1.id;
const originalCreatedAt = task1.createdAt;
console.log(`  Original text: ${originalText}`);
editTask(task1.id, 'Updated documentation task');
console.log(`  New text: ${task1.text}`);
console.log(`  ID preserved: ${task1.id === originalId}`);
console.log(`  CreatedAt preserved: ${task1.createdAt === originalCreatedAt}`);
console.log('');

// Test 7: Edit with empty text (should fail)
console.log('Test 7: Edit with empty text');
const beforeEdit = task1.text;
const editResult = editTask(task1.id, '   ');
console.log(`✓ Empty edit rejected: ${!editResult}`);
console.log(`  Text unchanged: ${task1.text === beforeEdit}`);
console.log('');

// Test 8: Delete task
console.log('Test 8: Delete task');
const beforeDelete = tasks.length;
console.log(`  Tasks before delete: ${beforeDelete}`);
deleteTask(task2.id);
console.log(`  Tasks after delete: ${tasks.length}`);
console.log(`  Count reduced by 1: ${tasks.length === beforeDelete - 1}`);
const found = tasks.find(t => t.id === task2.id);
console.log(`  Task removed: ${found === undefined}`);
console.log('');

// Test 9: Storage round-trip
console.log('Test 9: Storage round-trip');
console.log(`  Tasks in memory: ${tasks.length}`);
saveTasks(tasks);
const loadedTasks = loadTasks();
console.log(`  Tasks loaded: ${loadedTasks.length}`);
console.log(`  Match: ${loadedTasks.length === tasks.length}`);
if (loadedTasks.length > 0) {
  console.log(`  First task text: ${loadedTasks[0].text}`);
}
console.log('');

// Test 10: Task order preservation
console.log('Test 10: Task order preservation');
localStorage.clear();
tasks = [];
const t1 = addTask('First task');
// Small delay to ensure different timestamps
setTimeout(() => {
  const t2 = addTask('Second task');
  setTimeout(() => {
    const t3 = addTask('Third task');
    
    console.log(`  Task 1 createdAt: ${t1.createdAt}`);
    console.log(`  Task 2 createdAt: ${t2.createdAt}`);
    console.log(`  Task 3 createdAt: ${t3.createdAt}`);
    console.log(`  Ordered correctly: ${t1.createdAt < t2.createdAt && t2.createdAt < t3.createdAt}`);
    console.log('');
    
    console.log('=== All Tests Complete ===');
  }, 5);
}, 5);
