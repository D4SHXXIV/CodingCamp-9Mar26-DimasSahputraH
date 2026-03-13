# Quick Links Manual Test Guide

## Test Setup
1. Open `index.html` in a web browser
2. Open browser DevTools Console (F12)
3. Clear Local Storage: `localStorage.clear()`
4. Refresh the page

## Test Cases

### Test 1: Initial State
- **Expected**: Quick Links section displays with empty container
- **Expected**: Form has two input fields (name and URL) and "Add Link" button

### Test 2: Add Valid Link
- **Steps**: 
  1. Enter "GitHub" in name field
  2. Enter "https://github.com" in URL field
  3. Click "Add Link"
- **Expected**: 
  - Link button appears with "GitHub" text
  - Delete button appears next to it
  - Input fields are cleared
  - Link is saved to Local Storage

### Test 3: Click Link Opens New Tab
- **Steps**: Click the "GitHub" link button
- **Expected**: New tab opens with https://github.com (dashboard remains open)

### Test 4: Empty Name Validation
- **Steps**:
  1. Leave name field empty
  2. Enter "https://example.com" in URL field
  3. Click "Add Link"
- **Expected**: No link is created, inputs remain unchanged

### Test 5: Empty URL Validation
- **Steps**:
  1. Enter "Test" in name field
  2. Leave URL field empty
  3. Click "Add Link"
- **Expected**: No link is created, inputs remain unchanged

### Test 6: Whitespace-Only Validation
- **Steps**:
  1. Enter "   " (spaces) in name field
  2. Enter "   " (spaces) in URL field
  3. Click "Add Link"
- **Expected**: No link is created (whitespace is trimmed)

### Test 7: Multiple Links
- **Steps**: Add 3 different links
- **Expected**: All 3 links display in the order they were created

### Test 8: Delete Link
- **Steps**: Click "Delete" button on any link
- **Expected**: 
  - Link is removed from display
  - Link is removed from Local Storage
  - Other links remain intact

### Test 9: Persistence
- **Steps**:
  1. Add 2-3 links
  2. Refresh the page
- **Expected**: All links are still displayed (loaded from Local Storage)

### Test 10: Local Storage Verification
- **Steps**: In DevTools Console, run:
  ```javascript
  JSON.parse(localStorage.getItem('productivity-dashboard-links'))
  ```
- **Expected**: Array of link objects with id, name, and url properties

## Requirements Coverage

✓ Requirement 8.1: Input fields for name and URL  
✓ Requirement 8.2: Create Quick_Link with name and URL  
✓ Requirement 8.3: Empty name validation  
✓ Requirement 8.4: Empty URL validation  
✓ Requirement 8.5: Display links as clickable buttons  
✓ Requirement 8.6: Delete control for each link  
✓ Requirement 9.1: Opens URL in new tab  
✓ Requirement 9.2: Dashboard remains open  

## Implementation Checklist

✓ Subtask 9.1: renderLink() function creates link button DOM element  
✓ Subtask 9.1: renderLink() includes link button with name  
✓ Subtask 9.1: renderLink() includes delete button  
✓ Subtask 9.1: renderLinks() renders full links list  
✓ Subtask 9.1: DOM element references cached  
✓ Subtask 9.3: initQuickLinks() loads and renders links  
✓ Subtask 9.3: Form submit listener with preventDefault  
✓ Subtask 9.3: Validates both name and URL (trim and check empty)  
✓ Subtask 9.3: Clears input fields after successful creation  
✓ Subtask 9.3: Event listeners for link buttons  
✓ Subtask 9.3: Event listeners for delete buttons  
✓ Subtask 9.3: Links open in new tab (window.open with '_blank')
