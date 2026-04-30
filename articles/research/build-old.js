// generate-index.js
const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.';
const outputFile = path.join(targetDir, 'index.html');

/*
const files = fs.readdirSync(targetDir)
  .filter(f => f !== 'index.html' && !f.startsWith('.'))
  .sort();
*/

const files = fs.readdirSync(targetDir)
  .filter(f => {
    // ignore index and build script
    if (f === 'index.html' || f === 'build.js') return false;

    // ignore hidden files
    if (f.startsWith('.')) return false;

    // ignore backup files (ending in ~)
    if (f.endsWith('~')) return false;

    return true;
  })
  .sort();
  
const listItems = files.map(file => {
  const stats = fs.statSync(path.join(targetDir, file));
  const size = (stats.size / 1024).toFixed(1) + ' KB';
  const date = stats.mtime.toISOString().split('T')[0];

  return `<li>
    <a href="${file}">${file}</a>
    <span class="meta">(${size}, ${date})</span>
  </li>`;
}).join('\n');

/*
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Research Index</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; }
    li { margin: 0.5rem 0; }
    .meta { color: #666; margin-left: 0.5rem; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Research Index</h1>
  <ul>
    ${listItems}
  </ul>
</body>
</html>`;
*/

const generatedAt = new Date().toLocaleString();

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Research Index</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; }
    input { width: 100%; padding: 0.6rem; margin: 1rem 0; font-size: 1rem; }
    li { margin: 0.5rem 0; }
    .meta { color: #666; margin-left: 0.5rem; font-size: 0.9em; }
    .generated { color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Research Index</h1>
  <p class="generated">Generated: ${generatedAt}</p>

  <input id="searchBox" type="search" placeholder="Search files...">

  <ul id="fileList">
    ${listItems}
  </ul>

  <script>
    const searchBox = document.getElementById('searchBox');
    const fileList = document.getElementById('fileList');

    searchBox.addEventListener('input', () => {
      const query = searchBox.value.toLowerCase();

      fileList.querySelectorAll('li').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.hidden = !text.includes(query);
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(outputFile, html);
console.log(`Generated ${outputFile}`);
