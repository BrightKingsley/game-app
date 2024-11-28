const fs = require('fs');
const path = require('path');

function convertStyleStringToObject(styleString) {
  return styleString
    .split(';')
    .filter(Boolean)
    .map(rule => rule.trim().split(':'))
    .reduce((styleObject, [property, value]) => {
      if (property && value) {
        const jsProperty = property
          .trim()
          .replace(/-([a-z])/g, (_, char) => char.toUpperCase()); // Convert to camelCase
        styleObject[jsProperty] = value.trim();
      }
      return styleObject;
    }, {});
}

function convertJsxStyles(filePath) {
  // Read the content of the JSX file
  const jsxContent = fs.readFileSync(filePath, 'utf8');

  // Replace each inline style string with a JavaScript object
  const updatedContent = jsxContent.replace(
    /style="([^"]+)"/g, // Match `style="..."` patterns
    (_, styleString) => {
      const styleObject = convertStyleStringToObject(styleString);
      return `style={${JSON.stringify(styleObject)}}`; // Convert to JSX-compatible format
    },
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

// Usage
const filePath = path.resolve(
  __dirname,
  'src/components/feature/Auth/Onboarding/assets.tsx',
); // Replace with your file path
convertJsxStyles(filePath);
