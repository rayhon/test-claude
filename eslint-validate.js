#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ESLINT_CONFIG = {
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
};

function createEslintConfig() {
  const configPath = path.join(process.cwd(), '.eslintrc.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(ESLINT_CONFIG, null, 2));
    console.log('Created .eslintrc.json');
  }
}

function installEslint() {
  try {
    execSync('npm list eslint', { stdio: 'pipe' });
  } catch (error) {
    console.log('Installing eslint...');
    execSync('npm install --save-dev eslint', { stdio: 'inherit' });
  }
}

function runEslint(files = '.') {
  try {
    const command = `npx eslint ${files}`;
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    console.log('ESLint validation completed successfully!');
  } catch (error) {
    console.error('ESLint found issues. See output above.');
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length > 0 ? args.join(' ') : '.';

  console.log('Setting up ESLint validation...');

  createEslintConfig();
  installEslint();
  runEslint(files);
}

if (require.main === module) {
  main();
}

module.exports = { runEslint, createEslintConfig, installEslint };