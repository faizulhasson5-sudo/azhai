// Build script: generates 31 individual tool HTML files from template.html
// Run: node build.js

const fs = require('fs');
const path = require('path');

const tools = [
    'duplicate-remover','word-counter','char-counter','sentence-counter','paragraph-counter',
    'case-converter','remove-spaces','line-sorter','alpha-sorter','text-reverser',
    'url-encoder','url-decoder','html-encoder','html-decoder','b64-encoder','b64-decoder',
    'json-formatter','json-validator','xml-formatter','xml-validator','markdown-editor','markdown-preview',
    'robots-txt','sitemap-gen','meta-gen','og-generator','slug-generator','meta-desc-gen',
    'canonical-gen','keyword-density','keyword-extract',
    'find-replace','regex-tester','html-previewer'
];

const templatePath = path.join(__dirname, 'tools', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

tools.forEach(toolId => {
    // Each tool file is a standalone copy of template.html
    // The template reads toolId from URL path: /tools/{toolId}.html
    // Since this IS /tools/{toolId}.html, the regex will match correctly
    const filePath = path.join(__dirname, 'tools', toolId + '.html');
    fs.writeFileSync(filePath, template, 'utf8');
    console.log('Created: tools/' + toolId + '.html');
});

console.log('\nBuild complete! ' + tools.length + ' tool pages generated.');
