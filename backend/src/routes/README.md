Certainly! Here's a README format for the backend restaurant routes:

# Restaurant Routes

This is a guide to the restaurant routes in the backend of the application. It explains how the routes work, their functionality, and how to use them.

## Routes

### Restaurant Registration

Endpoint: `POST /api/restaurant/register`

This endpoint is used for registering a new restaurant owner. It expects the following data in the request body:

```json
{
  "name": "Restaurant Owner Name",
  "email": "owner@example.com",
  "password": "password123",
  "restaurantName": "My Restaurant",
  "address": "123 Main Street",
  "contactNumber": "123-456-7890"
}
```

### Restaurant Login

Endpoint: `POST /api/restaurant/login`

This endpoint is used for logging in as a restaurant owner. It expects the following data in the request body:

```json
{
  "email": "owner@example.com",
  "password": "password123"
}
```

### Update Restaurant Info

Endpoint: `PUT /api/restaurant/:id`

This endpoint is used for updating the information of a restaurant. It requires the ID of the restaurant to be included in the URL path and expects the updated restaurant information in the request body.

```json
{
  "name": "Updated Restaurant Name",
  "address": "456 Elm Street",
  "contactNumber": "987-654-3210"
}
```

## Controllers

The controllers handle the incoming requests from the routes. They extract the required data from the requests, perform any necessary validation or data processing, and then call the appropriate service methods.

The following controllers are available:

- `registerRestaurantOwner`: Handles the restaurant registration request.
- `loginRestaurantOwner`: Handles the restaurant login request.
- `updateRestaurantInfo`: Handles the restaurant info update request.

## Services

The services contain the business logic of the application. They interact with the Hasura GraphQL service and perform any necessary data operations or business rules.

The following services are available:

- `registerRestaurantOwner`: Registers a new restaurant owner.
- `loginRestaurantOwner`: Authenticates a restaurant owner.
- `updateRestaurantInfo`: Updates the information of a restaurant.

## Dependencies

The following dependencies are required for the backend:

- `express`: Web application framework for handling HTTP requests.
- `apollo-link` and `apollo-link-http`: Used for making GraphQL requests to the Hasura service.
- `pg`: PostgreSQL client library for connecting to the database.
- `dotenv`: Used for loading environment variables from a `.env` file.
- Other dependencies as specified in the `package.json` file.

## Setup and Configuration

1. Install the dependencies by running `npm install`.
2. Create a `.env` file in the root directory and configure the following environment variables:

   ```dotenv
   # Database connection
   DATABASE_URL=<your-database-url>

   # Hasura GraphQL endpoint
   HASURA_GRAPHQL_ENDPOINT=<your-hasura-graphql-endpoint>

   # Hasura admin secret
   HASURA_ADMIN_SECRET=<your-hasura-admin-secret>
   ```

3. Start the server by running `npm start`.

## Contribution

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).