import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock Data
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Smartphone", price: 699 }
];

app.get('/products', (request: Request, response: Response) => {
  console.log(`[Products Service] Fetching all products`);
  response.json(products);
});

app.listen(PORT, () => {
  console.log(`📦 Products Service running on http://localhost:${PORT}`);
});