# Database Setup Guide

## Quick Start

### 1. Seed the Database
Run this command to populate your database with sample data:

```bash
# Option 1: Using npm script
npm run seed

# Option 2: Using the helper script
node seed-database.js

# Option 3: Direct execution
npx ts-node src/scripts/seed.ts
```

### 2. Start the Backend Server
```bash
npm run dev
```

### 3. Start the Frontend
```bash
cd ../NotesAppFrontend
npm install
npm run dev
```

## Sample Data Created

### Users
- **demo@example.com** / password123
- **john@example.com** / password123  
- **jane@example.com** / password123

### Notes (10 sample notes)
Each user will have 3-4 notes with various topics:
- Welcome to Notes App
- Project Ideas
- Meeting Notes - Q1 Planning
- Recipe: Chocolate Chip Cookies
- Travel Planning - Europe Trip
- Learning Goals 2024
- Book Recommendations
- Workout Routine
- Investment Strategy
- Home Improvement Projects

## What You'll See

1. **Login Page**: Use any of the sample credentials above
2. **Notes List**: See all your notes with search and filtering
3. **Note Details**: Click on any note to view/edit it
4. **Create Notes**: Add new notes with tags
5. **Search**: Find notes by title or content
6. **Tags**: Filter notes by tags

## Troubleshooting

### If seeding fails:
1. Make sure MongoDB is running and accessible
2. Check your `.env` file has correct `MONGO_URI`
3. Ensure you have the required dependencies installed

### If you don't see data:
1. Check browser console for errors
2. Verify backend is running on port 5000
3. Check MongoDB connection in backend logs
4. Try refreshing the page

## Reset Database

To clear all data and start fresh:
```bash
# This will clear all users, notes, and refresh tokens
npm run seed
```

The seeding script automatically clears existing data before adding new sample data.
