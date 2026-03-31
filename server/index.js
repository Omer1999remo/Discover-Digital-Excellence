const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Demo Data
const products = [
  {
    id: 1,
    name: "Neon UI Kit Pro",
    description: "A comprehensive UI kit with 500+ components for modern dark-themed applications.",
    price: 49.00,
    originalPrice: 99.00,
    category: "UI Kits",
    author: "PixelStudio",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    badge: "Best Seller",
    tags: ["dashboard", "components", "dark"]
  },
  {
    id: 2,
    name: "CyberFont Family",
    description: "Futuristic display font with 12 weights perfect for tech and gaming projects.",
    price: 29.00,
    originalPrice: 59.00,
    category: "Fonts",
    author: "TypeFoundry",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    badge: "New",
    tags: ["display", "futuristic", "gaming"]
  },
  {
    id: 3,
    name: "3D Icon Pack Vol.1",
    description: "100+ glossy 3D icons in neon colors for stunning visual presentations.",
    price: 39.00,
    originalPrice: 79.00,
    category: "Icons",
    author: "DimensionLab",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    badge: null,
    tags: ["3d", "glossy", "neon"]
  },
  {
    id: 4,
    name: "Gradient Mesh Collection",
    description: "200+ abstract gradient meshes for backgrounds and visual effects.",
    price: 19.00,
    originalPrice: 39.00,
    category: "Illustrations",
    author: "ColorWave",
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    badge: "Sale",
    tags: ["gradient", "abstract", "backgrounds"]
  },
  {
    id: 5,
    name: "Dashboard Analytics UI",
    description: "Complete analytics dashboard template with charts, tables, and widgets.",
    price: 69.00,
    originalPrice: 129.00,
    category: "UI Kits",
    author: "DataViz",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    badge: "Popular",
    tags: ["dashboard", "analytics", "charts"]
  },
  {
    id: 6,
    name: "Neon 3D Shapes",
    description: "50+ geometric 3D shapes with neon lighting effects.",
    price: 35.00,
    originalPrice: 70.00,
    category: "3D",
    author: "PolyStudio",
    rating: 4.5,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    badge: null,
    tags: ["3d", "geometric", "neon"]
  },
  {
    id: 7,
    name: "Minimal Icon Set",
    description: "500+ minimalist line icons for web and mobile applications.",
    price: 24.00,
    originalPrice: 49.00,
    category: "Icons",
    author: "LineCraft",
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    badge: "Best Seller",
    tags: ["minimal", "line", "web"]
  },
  {
    id: 8,
    name: "Motion UI Kit",
    description: "Animated UI components with micro-interactions and transitions.",
    price: 59.00,
    originalPrice: 119.00,
    category: "UI Kits",
    author: "MotionLab",
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    badge: "New",
    tags: ["animation", "motion", "interactive"]
  },
  {
    id: 9,
    name: "Retro Pixel Font",
    description: "Authentic 8-bit pixel font family for nostalgic game designs.",
    price: 19.00,
    originalPrice: 39.00,
    category: "Fonts",
    author: "PixelType",
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    badge: null,
    tags: ["pixel", "retro", "gaming"]
  },
  {
    id: 10,
    name: "Device Mockup Bundle",
    description: "100+ realistic device mockups for showcasing your designs.",
    price: 45.00,
    originalPrice: 89.00,
    category: "Mockups",
    author: "MockStudio",
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    badge: "Popular",
    tags: ["mockup", "devices", "presentation"]
  },
  {
    id: 11,
    name: "Abstract Vector Pack",
    description: "300+ abstract vector shapes and patterns for creative projects.",
    price: 32.00,
    originalPrice: 64.00,
    category: "Illustrations",
    author: "VectorArt",
    rating: 4.5,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    badge: null,
    tags: ["vector", "abstract", "shapes"]
  },
  {
    id: 12,
    name: "Glassmorphism Kit",
    description: "UI components with glassmorphism effects and blur backgrounds.",
    price: 42.00,
    originalPrice: 84.00,
    category: "UI Kits",
    author: "GlassUI",
    rating: 4.7,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    badge: "Trending",
    tags: ["glass", "modern", "blur"]
  }
];

const categories = [
  { id: 1, name: "UI Kits", count: 156, icon: "Layout" },
  { id: 2, name: "Fonts", count: 89, icon: "Type" },
  { id: 3, name: "Icons", count: 234, icon: "Grid" },
  { id: 4, name: "3D", count: 67, icon: "Box" },
  { id: 5, name: "Illustrations", count: 123, icon: "Image" },
  { id: 6, name: "Mockups", count: 78, icon: "Smartphone" }
];

const featuredDeal = {
  id: 99,
  name: "The Ultimate Creator Bundle",
  description: "Everything you need to create stunning digital experiences. Includes 500+ premium assets: UI kits, fonts, icons, 3D models, and illustrations.",
  price: 49.00,
  originalPrice: 299.00,
  discount: 84,
  includes: [
    "500+ Premium UI Components",
    "50+ Font Families",
    "1000+ Vector Icons",
    "200+ 3D Models",
    "300+ Illustrations",
    "Lifetime Updates"
  ],
  image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1200&q=80",
  endsIn: "2 days 14 hours"
};

// Routes
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query;
  let filteredProducts = [...products];

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
  }

  res.json(filteredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/featured-deal', (req, res) => {
  res.json(featuredDeal);
});

// Cart endpoints (in-memory for demo)
let cart = [];

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      product
    });
  }
  
  res.json(cart);
});

app.delete('/api/cart/:productId', (req, res) => {
  cart = cart.filter(item => item.productId !== parseInt(req.params.productId));
  res.json(cart);
});

app.patch('/api/cart/:productId', (req, res) => {
  const { quantity } = req.body;
  const item = cart.find(item => item.productId === parseInt(req.params.productId));
  
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      cart = cart.filter(i => i.productId !== parseInt(req.params.productId));
    }
  }
  
  res.json(cart);
});

// Auth endpoints (demo)
const users = [];

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = { id: users.length + 1, email, name };
  users.push({ ...user, password });
  
  res.json({ user, token: 'demo-token-' + user.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    // Demo: allow any login
    const demoUser = { id: 1, email, name: email.split('@')[0] };
    return res.json({ user: demoUser, token: 'demo-token-1' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token: 'demo-token-' + user.id });
});

// Orders endpoint
let orders = [];

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: orders.length + 1,
    ...req.body,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  cart = []; // Clear cart after order
  res.json(order);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
