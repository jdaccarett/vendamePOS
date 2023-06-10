"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RestaurantOwnerController_js_1 = require("../../controllers/RestaurantOwnerController.js");
const router = express_1.default.Router();
router.post('/register-restaurant-owner', RestaurantOwnerController_js_1.registerRestaurantOwner);
exports.default = router;
//# sourceMappingURL=restaurantOwnerRoutes.js.map