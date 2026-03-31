# PixelMart - Digital Product Shop

A modern, full-stack digital product marketplace built with React.js, Express.js, and Tailwind CSS.

## Features

- **Modern UI/UX**: Dark theme with glassmorphism effects, magnetic cursor, and smooth animations
- **Product Catalog**: Browse products by category with filtering and search
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Flow**: Complete payment process with demo card
- **User Authentication**: Login/register with social providers
- **Featured Deals**: Special bundle offers
- **Responsive Design**: Works on all devices

## Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- GSAP (animations)
- shadcn/ui components
- Lucide React icons

### Backend
- Express.js
- CORS enabled
- Demo data (no database required)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run server
```

3. Start the frontend (in a new terminal):
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Demo Credentials

You can use any email/password to login (demo mode). For example:
- Email: demo@example.com
- Password: password

### Demo Card for Checkout
- Card Number: 4242 4242 4242 4242
- Expiry: 12/25
- CVC: 123

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/featured-deal` - Get featured deal

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

## Design Features

- **Magnetic Cursor**: Custom cursor that interacts with elements
- **3D Card Tilt**: Products tilt toward cursor on hover
- **Glassmorphism**: Translucent UI elements with blur
- **Scroll Animations**: GSAP-powered reveal animations
- **Neon Accents**: Purple (#7000FF) and Lime (#CCFF00) color scheme

## Project Structure

```
├── server/
│   └── index.js          # Express backend
├── src/
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── sections/         # Page sections
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app
│   └── App.css           # Global styles
└── package.json
```

## License

MIT
