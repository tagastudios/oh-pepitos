#!/usr/bin/env node
/**
 * Build script: Replaces env placeholders in HTML files with values from .env
 * Run: node build.js
 * Output: dist/ folder with processed HTML files
 */

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '.env');
const SRC_DIR = __dirname;
const DIST_DIR = path.join(__dirname, 'dist');

// Load .env (simple parser - no external deps)
function loadEnv() {
  const env = {};
  if (!fs.existsSync(ENV_FILE)) {
    console.warn('Warning: .env not found. Using placeholder values. Copy .env.example to .env and fill in your values.');
    return {
      GA_ID: '',
      CONTACT_PHONE: '',
      CONTACT_EMAIL: '',
      CONTACT_ADDRESS: '',
      WHATSAPP_NUMBER: '',
    };
  }
  const content = fs.readFileSync(ENV_FILE, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed.slice(eq + 1).trim();
        env[key] = value;
      }
    }
  });
  return env;
}

const env = loadEnv();

const placeholders = {
  '{{GA_ID}}': env.GA_ID || '',
  '{{CONTACT_PHONE}}': env.CONTACT_PHONE || '',
  '{{CONTACT_EMAIL}}': env.CONTACT_EMAIL || '',
  '{{CONTACT_ADDRESS}}': env.CONTACT_ADDRESS || '',
  '{{WHATSAPP_NUMBER}}': env.WHATSAPP_NUMBER || env.CONTACT_PHONE || '',
};

// HTML files to process
const htmlFiles = ['index.html', 'menu-1.html', 'contact.html', '404.html'];

// Directories to copy as-is (css, js, images, fonts)
const assetDirs = ['css', 'js', 'images'];
const fontDirs = ['css/fonts'];

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Process HTML
htmlFiles.forEach((file) => {
  const srcPath = path.join(SRC_DIR, file);
  const distPath = path.join(DIST_DIR, file);
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      content = content.split(placeholder).join(value);
    });
    fs.writeFileSync(distPath, content);
    console.log('Processed:', file);
  }
});

// Copy assets
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((item) => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

assetDirs.forEach((dir) => {
  const src = path.join(SRC_DIR, dir);
  const dest = path.join(DIST_DIR, dir);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
    console.log('Copied:', dir);
  }
});

if (fs.existsSync(path.join(SRC_DIR, 'css/fonts'))) {
  copyRecursive(path.join(SRC_DIR, 'css/fonts'), path.join(DIST_DIR, 'css/fonts'));
  console.log('Copied: css/fonts');
}

console.log('Build complete. Output in dist/');
