"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantOwnerRoutes_1 = __importDefault(require("./routes/restaurantRoutes/restaurantOwnerRoutes"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/api', restaurantOwnerRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map