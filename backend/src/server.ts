import express from 'express';
import restaurantOwnerRoutes from './routes/restaurantRoutes/restaurantOwnerRoutes';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', restaurantOwnerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
