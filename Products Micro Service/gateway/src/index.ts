import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3000;

// Root Route - Fixed the syntax here
app.get('/', (request: Request, res: Response) => {
  res.send('API Gateway is running!');
});

// Proxy to Products Service
app.use('/api/products', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/products', // Rewrites /api/products to /products for the service
  },
}));

// Proxy to Orders Service
app.use('/api/orders', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/orders': '/orders',
  },
}));

app.listen(PORT, () => {
  console.log(`🚀 Gateway running on http://localhost:${PORT}`);
});