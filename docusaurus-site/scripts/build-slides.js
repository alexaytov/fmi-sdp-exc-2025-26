#!/usr/bin/env node

/**
 * Rebuild slides without full Docusaurus build
 * Usage: node scripts/build-slides.js
 */

const path = require('path');
const fs = require('fs-extra');

// Import plugin functions
const revealPlugin = require('../plugins/reveal-slides-plugin.js');

const siteDir = path.join(__dirname, '..');
const docsDir = path.join(siteDir, 'docs');
const staticSlidesDir = path.join(siteDir, 'static', 'slides');
const baseUrl = '/fmi-sdp-exc-2025-26/';

console.log('🔄 Rebuilding reveal.js slides...\n');

// Mock context object
const context = {
  siteDir,
  siteConfig: { baseUrl }
};

// Create plugin instance
const plugin = revealPlugin(context, {});

// Execute loadContent to scan slides
plugin.loadContent().then(content => {
  console.log(`✓ Found ${content.slides.length} slide deck(s)\n`);

  // Clean static/slides directory
  if (fs.existsSync(staticSlidesDir)) {
    fs.removeSync(staticSlidesDir);
  }
  fs.ensureDirSync(staticSlidesDir);

  // Generate slides HTML
  const actions = {
    setGlobalData: () => {} // Mock
  };

  return plugin.contentLoaded({ content, actions });
}).then(() => {
  console.log('\n✅ Slides rebuilt successfully!');
  console.log('\n💡 Refresh your browser to see changes.');
}).catch(error => {
  console.error('❌ Error rebuilding slides:', error);
  process.exit(1);
});
