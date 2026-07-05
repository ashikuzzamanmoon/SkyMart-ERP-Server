# SkyMart ERP - Backend API Documentation

Base URL: `http://localhost:5000`

All endpoints that require authentication must include the JWT token in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

Standardized API Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Action successful",
  "data": { ... },
  "meta": { "page": 1, "limit": 10, "total": 100, "totalPage": 10 } // if applicable
}
```

Standardized Error Response:
```json
{
  "success": false,
  "message": "Error Message",
  "errorDetails": { ... },
  "stack": "..." // Only in development
}
```

---

## Health Check

### GET `/api/health`
- **Description**: Verify the server is running.
- **Role Required**: None
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Server is running"
  }
  ```

---

## Auth Module

### POST `/api/auth/login`
- **Description**: Authenticate user and receive JWT.
- **Role Required**: None
- **Request Body**:
  ```json
  {
    "email": "admin@skymart.com",
    "password": "securepassword123"
  }
  ```
- **Success Response**: `data` contains `{ user, token }`.

---

## Product Module

### POST `/api/products`
- **Description**: Create a new product. **Uses `multipart/form-data`**.
- **Role Required**: `admin`, `manager`
- **Request Body (FormData)**:
  - `name`: string
  - `sku`: string
  - `category`: string
  - `purchasePrice`: number
  - `sellingPrice`: number
  - `stockQuantity`: number
  - `image`: file
- **Success Response**: Product object.

### GET `/api/products`
- **Description**: List products with pagination, sorting, and filtering.
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Array of products and `meta` object.

### GET `/api/products/:id`
- **Description**: Get single product by ID.
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Product object.

### PATCH `/api/products/:id`
- **Description**: Update an existing product. **Uses `multipart/form-data`**.
- **Role Required**: `admin`, `manager`
- **Request Body (FormData)**: Any subset of the fields in POST.
- **Success Response**: Updated product object.

### DELETE `/api/products/:id`
- **Description**: Soft delete a product.
- **Role Required**: `admin`, `manager`
- **Success Response**: Deleted product object.

---

## Customer Module

### POST `/api/customers`
- **Description**: Create a new customer.
- **Role Required**: `admin`, `manager`
- **Request Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "phone": "+123456789",
    "email": "john@example.com",
    "address": "123 Main St"
  }
  ```
- **Success Response**: Customer object.

### GET `/api/customers`
- **Description**: List customers with QueryBuilder support.
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Array of customers and `meta`.

### GET `/api/customers/:id`
- **Description**: Get single customer by ID.
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Customer object.

### PATCH `/api/customers/:id`
- **Description**: Update a customer.
- **Role Required**: `admin`, `manager`
- **Request Body (JSON)**: Any subset of the customer fields.
- **Success Response**: Updated customer object.

### DELETE `/api/customers/:id`
- **Description**: Soft delete a customer.
- **Role Required**: `admin`, `manager`
- **Success Response**: Deleted customer object.

---

## Sale Module

### POST `/api/sales`
- **Description**: Process a new sale, calculating totals dynamically and deducting stock atomically.
- **Role Required**: `admin`, `manager`, `employee`
- **Request Body (JSON)**:
  ```json
  {
    "customer": "60d5ec49f1b2c8a5c8e0d3f2",
    "items": [
      {
        "product": "60d5ec8af1b2c8a5c8e0d3f4",
        "quantity": 2
      }
    ]
  }
  ```
- **Success Response**: Populated Sale object.
- **Error Example (Insufficient Stock)**:
  ```json
  {
    "success": false,
    "message": "Insufficient stock for product MUG-123",
    "errorDetails": {}
  }
  ```

### GET `/api/sales`
- **Description**: List all sales with QueryBuilder pagination (newest first by default).
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Array of populated sales and `meta`.

### GET `/api/sales/:id`
- **Description**: Deeply populated single sale detail.
- **Role Required**: `admin`, `manager`, `employee`
- **Success Response**: Populated Sale object.

---

## Dashboard Analytics Module

### GET `/api/dashboard/stats`
- **Description**: Retrieve high-level statistics for the dashboard.
- **Role Required**: `admin`, `manager`
- **Success Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Dashboard statistics retrieved successfully",
    "data": {
      "totalProducts": 150,
      "totalCustomers": 500,
      "totalSales": 1250,
      "totalRevenue": 250000.5,
      "lowStockProducts": [
        {
          "_id": "60d5ec8af1b2c8a5c8e0d3f4",
          "name": "Test Mug",
          "sku": "MUG-123",
          "stockQuantity": 2
        }
      ]
    }
  }
  ```
