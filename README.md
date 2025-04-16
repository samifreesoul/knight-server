# Knight Server

A Node.js and Express server built with TypeScript and Vite.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The server will start on port 3000 by default.

## Available Endpoints

- `GET /status` - Returns a status check response
  - Response: `{ "status": "ok" }`

## Build for Production

To build the server for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```
