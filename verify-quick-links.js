// Quick Links Verification Script
// Run this in the browser console after loading index.html

console.log('=== Quick Links Verification ===\n');

// Test 1: Check functions exist
console.log('1. Function Existence:');
console.log('   renderLink:', typeof renderLink === 'function' ? '✓' : '✗');
console.log('   renderLinks:', typeof renderLinks === 'function' ? '✓' : '✗');
console.log('   initQuickLinks:', typeof initQuickLinks === 'function' ? '✓' : '✗');
console.log('   addLink:', typeof addLink === 'function' ? '✓' : '✗');
console.log('   deleteLink:', typeof deleteLink === 'function' ? '✓' : '✗');
console.log('   openLink:', typeof openLink === 'function' ? '✓' : '✗');

// Test 2: Check DOM elements cached
console.log('\n2. DOM Elements Cached:');
console.log('   linkNameInput:', linkNameInput ? '✓' : '✗');
console.log('   linkUrlInput:', linkUrlInput ? '✓' : '✗');
console.log('   linkForm:', linkForm ? '✓' : '✗');
console.log('   linksContainer:', linksContainer ? '✓' : '✗');

// Test 3: Test addLink function
console.log('\n3. Add Link Functionality:');
const initialCount = links.length;
const testLink1 = addLink('Test Link', 'https://example.com');
console.log('   Valid link created:', testLink1 !== null ? '✓' : '✗');
console.log('   Link has id:', testLink1 && testLink1.id ? '✓' : '✗');
console.log('   Link has name:', testLink1 && testLink1.name === 'Test Link' ? '✓' : '✗');
console.log('   Link has url:', testLink1 && testLink1.url === 'https://example.com' ? '✓' : '✗');
console.log('   Links array updated:', links.length === initialCount + 1 ? '✓' : '✗');

// Test 4: Test validation
console.log('\n4. Input Validation:');
const emptyName = addLink('', 'https://example.com');
console.log('   Empty name rejected:', emptyName === null ? '✓' : '✗');
const emptyUrl = addLink('Test', '');
console.log('   Empty URL rejected:', emptyUrl === null ? '✓' : '✗');
const whitespace = addLink('   ', '   ');
console.log('   Whitespace rejected:', whitespace === null ? '✓' : '✗');

// Test 5: Test deleteLink
console.log('\n5. Delete Link Functionality:');
const linkToDelete = addLink('Delete Me', 'https://delete.com');
const countBeforeDelete = links.length;
const deleted = deleteLink(linkToDelete.id);
console.log('   Link deleted:', deleted ? '✓' : '✗');
console.log('   Links array updated:', links.length === countBeforeDelete - 1 ? '✓' : '✗');

// Test 6: Test Local Storage
console.log('\n6. Local Storage:');
const storedLinks = JSON.parse(localStorage.getItem('productivity-dashboard-links'));
console.log('   Links saved to storage:', storedLinks !== null ? '✓' : '✗');
console.log('   Storage has correct count:', storedLinks && storedLinks.length === links.length ? '✓' : '✗');

// Test 7: Test renderLink
console.log('\n7. Render Functions:');
const testLinkObj = { id: 'test-123', name: 'Test', url: 'https://test.com' };
const renderedElement = renderLink(testLinkObj);
console.log('   renderLink returns element:', renderedElement instanceof HTMLElement ? '✓' : '✗');
console.log('   Element has link-button class:', renderedElement.className === 'link-button' ? '✓' : '✗');
console.log('   Element has data-link-id:', renderedElement.dataset.linkId === 'test-123' ? '✓' : '✗');

// Re-render to show test link
renderLinks(links);

console.log('\n=== Verification Complete ===');
console.log('Check the Quick Links section to see rendered links.');
