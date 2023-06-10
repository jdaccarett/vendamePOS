import express from 'express';
import { registerRestaurantOwner } from '../../controllers/RestaurantOwnerController.js';

const router = express.Router();

router.post('/register-restaurant-owner', registerRestaurantOwner);

export default router;
