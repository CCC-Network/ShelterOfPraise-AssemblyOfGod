const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');

// Get all .tsx files in the pages directory
const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove unused React import if it exists
  content = content.replace(/^import React[^;]+;\s*\n?/gm, '');
  
  // Add default export if it doesn't exist
  if (!content.includes('export default')) {
    const componentName = content.match(/const\s+(\w+)\s*=/)?.[1];
    if (componentName) {
      content = content.trim() + '\n\nexport default ' + componentName + ';\n';
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('All page components have been updated.');
