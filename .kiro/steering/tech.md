# Technology Stack

## Core Technologies

- **HTML5**: Semantic markup for structure
- **CSS3**: Single stylesheet for all styling
- **Vanilla JavaScript (ES6+)**: No frameworks, libraries, or build tools
- **Local Storage API**: Browser-based data persistence

## Browser Support

The application targets modern browsers:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

Uses only standard Web APIs supported across all target browsers.

## Build System

**None required** - This is a vanilla JavaScript project with no build step, transpilation, or bundling.

## Development Workflow

### Running the Application

Simply open `index.html` in a web browser. No server required for basic functionality.

For development with live reload, you can use any simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using VS Code Live Server extension
# Right-click index.html > Open with Live Server
```

### Testing

The project uses property-based testing with `fast-check` library:

```bash
# Install dependencies
npm install --save-dev fast-check

# Run tests (requires test runner like Jest, Mocha, or Vitest)
npm test
```

### Code Style

- Use ES6+ features (arrow functions, const/let, template literals)
- Prefer functional approaches where appropriate
- Keep functions small and focused
- Use descriptive variable names
- Add comments for complex logic

## Performance Considerations

- Minimal DOM manipulation
- Efficient event handling with delegation where appropriate
- Single intervals for timer and time updates
- Direct DOM queries cached in variables
- Keep data lists reasonable (< 100 items for optimal performance)
