#!/usr/bin/env node

// Simple script to seed the database
const { spawn } = require('child_process');
const path = require('path');

console.log('🌱 Starting database seeding...');
console.log('📝 This will create sample users and notes in your database');
console.log('');

const seedProcess = spawn('npx', ['ts-node', 'src/scripts/seed.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

seedProcess.on('close', (code) => {
  if (code === 0) {
    console.log('');
    console.log('✅ Database seeding completed successfully!');
    console.log('🚀 You can now start the backend server and see the data in the frontend');
  } else {
    console.log('');
    console.log('❌ Database seeding failed with code:', code);
  }
});

seedProcess.on('error', (error) => {
  console.error('❌ Error running seed script:', error);
});
