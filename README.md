# Notes App Backend

A Node.js + Express + TypeScript backend API for the Notes App with JWT authentication and MongoDB.

## Features

- **Authentication**: JWT-based auth with access + refresh tokens
- **Notes CRUD**: Full CRUD operations for notes with search and filtering
- **Security**: Password hashing, rate limiting, CORS, helmet
- **Validation**: Zod schemas for request validation
- **Testing**: Jest + Supertest with in-memory MongoDB
- **TypeScript**: Full type safety throughout

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **Security**: bcryptjs, helmet, cors, express-rate-limit

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## Environment Variables

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/notesapp
JWT_ACCESS_SECRET=your-super-secret-access-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
ACCESS_TTL=10m
REFRESH_TTL=7d
CORS_ORIGIN=http://localhost:5173
COOKIE_DOMAIN=localhost
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Create new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Notes (Protected)
- `GET /api/v1/notes` - List notes with pagination/filtering
- `POST /api/v1/notes` - Create new note
- `GET /api/v1/notes/:id` - Get single note
- `PATCH /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note
- `GET /api/v1/notes/tags` - Get all available tags

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── config/
│   └── env.ts              # Environment configuration
├── db/
│   └── mongoose.ts          # Database connection
├── modules/
│   ├── auth/
│   │   ├── controller.ts    # Auth endpoints
│   │   ├── service.ts       # Auth business logic
│   │   ├── tokens.ts        # JWT utilities
│   │   └── routes.ts        # Auth routes
│   ├── notes/
│   │   ├── controller.ts    # Notes endpoints
│   │   ├── service.ts       # Notes business logic
│   │   ├── model.ts         # Notes model
│   │   └── routes.ts        # Notes routes
│   └── users/
│       └── model.ts         # User model
├── middlewares/
│   ├── authGuard.ts         # Authentication middleware
│   ├── error.ts             # Error handling
│   └── rateLimit.ts         # Rate limiting
├── shared/
│   └── schemas.ts           # Shared validation schemas
├── tests/
│   └── auth.test.ts         # Test files
├── app.ts                   # Express app configuration
└── server.ts                # Server entry point
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT access tokens (short-lived)
- HTTP-only refresh token cookies
- Rate limiting on auth endpoints
- CORS protection
- Helmet for security headers
- Input validation with Zod
- Error handling without stack traces in production

## Testing

Tests use Jest with in-memory MongoDB for isolated testing:

```bash
npm test
```

## Development

The server runs on `http://localhost:4000` by default with hot reload enabled.

## License

MIT
# NotesAppBackend
