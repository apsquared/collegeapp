# College Scouter

A Next.js application for scouting and managing college information with MongoDB integration.

## Features

- View all colleges in the database
- Add new colleges
- Search functionality (coming soon)
- Compare colleges (coming soon)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd college-scouter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/college-scouter
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# If you have MongoDB installed locally
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/colleges` - Get all colleges
- `POST /api/colleges` - Create a new college

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── colleges/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── mongodb.ts
└── models/
    └── College.ts
```

## Database Schema

### College Model
- `name` (String, required, unique)
- `location` (String, required)
- `description` (String, optional)
- `website` (String, optional)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-generated)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your project to Vercel
3. Add your MongoDB connection string as an environment variable
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
# collegeapp
