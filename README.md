# Cursor Pagination Assignment

## Overview

This project is a backend application built using Node.js, Express.js, MongoDB Atlas, and Mongoose. It allows users to browse a large dataset of products, filter by category, and paginate through results efficiently using cursor-based pagination.

A simple frontend is also included to demonstrate product browsing and category filtering.

## Features

* 200,000 seeded products
* Cursor-based pagination
* Category filtering
* Compound indexes for efficient queries
* REST API built with Express.js
* MongoDB Atlas database
* Frontend deployed on Vercel
* Backend deployed on Render

## Pagination Approach

I used cursor-based pagination with `createdAt` and `_id` instead of offset pagination. This approach is more efficient for large datasets and avoids issues caused by skipping large numbers of documents.

## Database Indexes

```js
{
  createdAt: -1,
  _id: -1
}

{
  category: 1,
  createdAt: -1,
  _id: -1
}
```

These indexes help improve filtering and sorting performance.

## Running Locally

```bash
npm install
npm run seed
npm start
```

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* React
* Tailwind CSS

## Author

Mohd Anas Ali
