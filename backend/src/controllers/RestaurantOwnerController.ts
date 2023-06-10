import { Request, Response } from 'express';
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const executeGraphQLQuery = async <T>(query: DocumentNode, variables?: any): Promise<T> => {
  const httpLink = createHttpLink({
    uri: process.env.HASURA_GRAPHQL_ENDPOINT!,
    fetch: fetch as any, // Use RequestInfo | URL type
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET!,
    },
  });

  const { data, errors } = await makePromise<any>(execute(httpLink, { query, variables }));

  if (errors) {
    throw new Error(JSON.stringify(errors));
  }

  return data as T;
};

interface InsertUserResponse {
  insert_users_one: {
    id: string;
  };
}

interface InsertRestaurantResponse {
  insert_restaurants_one: {
    id: string;
  };
}

export const registerRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, contactNumber } = req.body;

    // Create a new restaurant
    const createRestaurantQuery: DocumentNode = gql`
      mutation CreateRestaurant($name: String!, $address: String!, $contactNumber: String!) {
        insert_restaurants_one(object: { name: $name, address: $address, contact_number: $contactNumber }) {
          id
        }
      }
    `;

    const createRestaurantVariables = { name, address, contactNumber };
    const { insert_restaurants_one } = await executeGraphQLQuery<InsertRestaurantResponse>(
      createRestaurantQuery,
      createRestaurantVariables
    );

    res.status(200).json({ message: 'Restaurant registration successful', restaurantId: insert_restaurants_one.id });
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ message: `Restaurant registration failed: ${JSON.stringify(error)}` });
  }
};

export const registerRestaurantOwner: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  try {
    const { name, email, password, restaurantId } = req.body;

    if (!name || !email || !password || !restaurantId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Create a new user
    const createUserQuery: DocumentNode = gql`
      mutation CreateUser($name: String!, $email: String!, $password: String!, $restaurantId: String!) {
        insert_users_one(object: { name: $name, email: $email, password: $password, restaurant_id: $restaurantId }) {
          id
        }
      }
    `;

    const createUserVariables = { name, email, password, restaurantId };
    const { insert_users_one } = await executeGraphQLQuery<InsertUserResponse>(createUserQuery, createUserVariables);

    res.status(200).json({ message: 'Registration successful', userId: insert_users_one.id });
  } catch (error) {
    console.error('Error registering restaurant owner:', error);
    res.status(500).json({ message: `Registration failed: ${JSON.stringify(error)}` });
  }
};
