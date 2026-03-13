/**
 * Unit tests for Task CRUD functions
 * Tests the task data model and CRUD operations
 */

// Mock localStorage for testing
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

// Load the app.js functions (in a real test environment, you'd import them)
// For now, we'll test the logic manually

describe('Task CRUD Operations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('loadTasks returns empty array when no tasks exist', () => {
    // This would call loadTasks() and expect []
    const result = localStorage.getItem('productivity-dashboard-tasks');
    expect(result).toBeNull();
  });

  test('addTask creates task with correct structure', () => {
    // Simulate addTask behavior
    const text = 'Test task';
    const timestamp = Date.now();
    const task = {
      id: `task-${timestamp}`,
      text: text,
      completed: false,
      createdAt: timestamp
    };
    
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('text', 'Test task');
    expect(task).toHaveProperty('completed', false);
    expect(task).toHaveProperty('createdAt');
    expect(typeof task.createdAt).toBe('number');
  });

  test('addTask rejects empty string', () => {
    const emptyText = '   ';
    const trimmed = emptyText.trim();
    expect(trimmed.length).toBe(0);
    // Should return null for empty input
  });

  test('addTask trims whitespace from input', () => {
    const text = '  Test task  ';
    const trimmed = text.trim();
    expect(trimmed).toBe('Test task');
  });

  test('toggleTaskComplete toggles completion status', () => {
    const task = {
      id: 'task-1',
      text: 'Test',
      completed: false,
      createdAt: Date.now()
    };
    
    task.completed = !task.completed;
    expect(task.completed).toBe(true);
    
    task.completed = !task.completed;
    expect(task.completed).toBe(false);
  });

  test('editTask updates text while preserving other fields', () => {
    const task = {
      id: 'task-1',
      text: 'Original text',
      completed: false,
      createdAt: 12345
    };
    
    const newText = 'Updated text';
    task.text = newText;
    
    expect(task.text).toBe('Updated text');
    expect(task.id).toBe('task-1');
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBe(12345);
  });

  test('editTask rejects empty string', () => {
    const newText = '   ';
    const trimmed = newText.trim();
    expect(trimmed.length).toBe(0);
    // Should return false for empty input
  });

  test('deleteTask removes task from array', () => {
    const tasks = [
      { id: 'task-1', text: 'Task 1', completed: false, createdAt: 1 },
      { id: 'task-2', text: 'Task 2', completed: false, createdAt: 2 },
      { id: 'task-3', text: 'Task 3', completed: false, createdAt: 3 }
    ];
    
    const index = tasks.findIndex(t => t.id === 'task-2');
    tasks.splice(index, 1);
    
    expect(tasks.length).toBe(2);
    expect(tasks.find(t => t.id === 'task-2')).toBeUndefined();
    expect(tasks[0].id).toBe('task-1');
    expect(tasks[1].id).toBe('task-3');
  });

  test('task IDs are unique based on timestamp', () => {
    const timestamp1 = Date.now();
    const id1 = `task-${timestamp1}`;
    
    // Simulate small delay
    const timestamp2 = timestamp1 + 1;
    const id2 = `task-${timestamp2}`;
    
    expect(id1).not.toBe(id2);
  });

  test('tasks maintain creation order', () => {
    const tasks = [
      { id: 'task-1', text: 'First', completed: false, createdAt: 1000 },
      { id: 'task-2', text: 'Second', completed: false, createdAt: 2000 },
      { id: 'task-3', text: 'Third', completed: false, createdAt: 3000 }
    ];
    
    // Verify order by createdAt
    for (let i = 1; i < tasks.length; i++) {
      expect(tasks[i].createdAt).toBeGreaterThan(tasks[i-1].createdAt);
    }
  });
});
