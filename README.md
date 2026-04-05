# ATC Operations Platform Dashboard

A Next.js React dashboard for ATC operations management, featuring project tracking, procurement management, and client relationship insights.

## Features

- **Overview Dashboard**: Real-time metrics and revenue trends across branches
- **Projects Tab**: Track active projects with health status and KPIs
- **Procurement Tab**: Monitor parts and equipment orders
- **Clients Tab**: View client relationships and engagement status

## Tech Stack

- **Next.js 14** - React framework
- **Recharts** - Data visualization
- **React Hooks** - State management

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js settings
5. Click Deploy

### Manual Deployment

The `out` directory is ready to be deployed to any static host.

## Environment Variables

Currently using mock data. To integrate real data, add environment variables as needed:

```
NEXT_PUBLIC_API_URL=your_api_url
```

## Project Structure

```
├── pages/
│   └── index.jsx       # Main dashboard component
├── package.json
├── next.config.js
└── README.md
```

## Support

For more information, visit the [Next.js Documentation](https://nextjs.org/docs)
