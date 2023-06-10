"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRestaurantOwner = exports.registerRestaurant = void 0;
const apollo_link_1 = require("apollo-link");
const apollo_link_http_1 = require("apollo-link-http");
const graphql_tag_1 = require("graphql-tag");
const fetch = (url, init) => Promise.resolve().then(() => __importStar(require("node-fetch"))).then(({ default: fetch }) => fetch(url, init));
const executeGraphQLQuery = async (query, variables) => {
    const httpLink = (0, apollo_link_http_1.createHttpLink)({
        uri: process.env.HASURA_GRAPHQL_ENDPOINT,
        fetch: fetch,
        headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
    });
    const { data, errors } = await (0, apollo_link_1.makePromise)((0, apollo_link_1.execute)(httpLink, { query, variables }));
    if (errors) {
        throw new Error(JSON.stringify(errors));
    }
    return data;
};
const registerRestaurant = async (req, res) => {
    try {
        const { name, address, contactNumber } = req.body;
        // Create a new restaurant
        const createRestaurantQuery = (0, graphql_tag_1.gql) `
      mutation CreateRestaurant($name: String!, $address: String!, $contactNumber: String!) {
        insert_restaurants_one(object: { name: $name, address: $address, contact_number: $contactNumber }) {
          id
        }
      }
    `;
        const createRestaurantVariables = { name, address, contactNumber };
        const { insert_restaurants_one } = await executeGraphQLQuery(createRestaurantQuery, createRestaurantVariables);
        res.status(200).json({ message: 'Restaurant registration successful', restaurantId: insert_restaurants_one.id });
    }
    catch (error) {
        console.error('Error registering restaurant:', error);
        res.status(500).json({ message: `Restaurant registration failed: ${JSON.stringify(error)}` });
    }
};
exports.registerRestaurant = registerRestaurant;
const registerRestaurantOwner = async (req, res) => {
    try {
        const { name, email, password, restaurantId } = req.body;
        if (!name || !email || !password || !restaurantId) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        // Create a new user
        const createUserQuery = (0, graphql_tag_1.gql) `
      mutation CreateUser($name: String!, $email: String!, $password: String!, $restaurantId: String!) {
        insert_users_one(object: { name: $name, email: $email, password: $password, restaurant_id: $restaurantId }) {
          id
        }
      }
    `;
        const createUserVariables = { name, email, password, restaurantId };
        const { insert_users_one } = await executeGraphQLQuery(createUserQuery, createUserVariables);
        res.status(200).json({ message: 'Registration successful', userId: insert_users_one.id });
    }
    catch (error) {
        console.error('Error registering restaurant owner:', error);
        res.status(500).json({ message: `Registration failed: ${JSON.stringify(error)}` });
    }
};
exports.registerRestaurantOwner = registerRestaurantOwner;
//# sourceMappingURL=RestaurantOwnerController.js.map