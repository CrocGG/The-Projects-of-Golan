import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Mock Data
const orders = [
  { id: 101, product_id: 1, quantity: 2 },
  { id: 102, product_id: 2, quantity: 1 }
];

app.get('/orders', (request: Request, response: Response) => {
  console.log(`[Orders Service] Fetching all orders`);
  response.json(orders);
});

app.listen(PORT, () => {
  console.log(`📝 Orders Service running on http://localhost:${PORT}`);
});