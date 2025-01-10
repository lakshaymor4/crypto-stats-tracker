# Cryptocurrency Price Tracker

A production-grade Node.js application that tracks cryptocurrency prices using the CoinGecko API. The application fetches and stores price data for Bitcoin, Ethereum, and Matic, and provides APIs to access this data.

## Features

- Background job to fetch cryptocurrency prices every 2 hours
- REST APIs for accessing latest cryptocurrency stats and price deviation
- Production-ready setup with proper error handling, logging, and monitoringe

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Winston (Logging)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Edit the `.env` file with your configuration:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto_tracker
NODE_ENV=development
```

4. Start the application:
```bash
node index,js

```

## API Documentation

### Get Latest Cryptocurrency Stats

```
GET /api/stats?coin={coinId}
```

Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Deviation

```
GET /api/deviation?coin={coinId}
```

Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

Response:
```json
{
    "deviation": 4082.48
}
```

## Project Structure

```
.
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── model/           # Database models
│   ├── services/        # Business logic
│   ├── jobs/            # Background jobs
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js          # Application entry point
└── package.json
```

## Scripts

- `npm start`: Start the application in production mode
- `npm run dev`: Start the application in development mode with hot reload
- `npm run build`: Build the application (if using TypeScript)


## Logging

Logs are written to:
- `error.log`: For error logs
- `combined.log`: For all logs
- Console: Based on environment


## Security Features

- Helmet.js for security headers
- CORS protection
- Input validation
- Environment variable protection
- MongoDB security best practices

## Monitoring

The application includes:
- Winston logging
- Background job status tracking
- Database connection monitoring

## Author

Your Name lakshay.8026@gmail.com

## Acknowledgments

- CoinGecko API for cryptocurrency data
- All open-source libraries used in this project
