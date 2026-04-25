# E-Commerce Server

REST API server for the e-commerce platform, built with **Node.js**, **Express**, and **MongoDB**.

---

## Architecture

```mermaid
graph TD
    Client["React Client(Vite + Redux)"]
    Server["Express Server(:3000)"]
    DB["MongoDB"]
    Cloudinary["Cloudinary(Image Storage)"]
    PayPal["PayPal(Payments)"]

    Client -->|REST / cookie auth| Server
    Server -->|Mongoose ODM| DB
    Server -->|Image upload| Cloudinary
    Server -->|Create & capture orders| PayPal
    Client -->|Redirect approval| PayPal
```

---

## Data Model (ER Diagram)

```mermaid
erDiagram
    User {
        ObjectId _id
        string userName
        string email
        string password
        string role
    }
    Product {
        ObjectId _id
        string image
        string title
        string description
        string category
        string brand
        number price
        number salePrice
        number totalStock
        date createdAt
    }
    Cart {
        ObjectId _id
        ObjectId userId
        date createdAt
    }
    CartItem {
        ObjectId productId
        number quantity
    }
    Order {
        ObjectId _id
        ObjectId userId
        ObjectId cartId
        string orderStatus
        string paymentMethod
        string paymentStatus
        number totalAmount
        string paymentId
        string payerId
        date createdAt
    }
    OrderItem {
        string productId
        string title
        string image
        number price
        number quantity
    }
    AddressInfo {
        string addressId
        string address
        string city
        string postalCode
        string country
        string phone
        string notes
    }
    Address {
        ObjectId _id
        ObjectId userId
        string address
        string city
        string postalCode
        string country
        string phone
        string notes
    }
    ProductReview {
        ObjectId _id
        ObjectId productId
        ObjectId userId
        string reviewText
        number rating
        date createdAt
    }
    Feature {
        ObjectId _id
        string image
        date createdAt
    }

    User ||--o{ Cart : "has"
    Cart ||--|{ CartItem : "contains"
    CartItem }o--|| Product : "references"
    User ||--o{ Order : "places"
    Order ||--|{ OrderItem : "contains"
    Order ||--|| AddressInfo : "ships to"
    User ||--o{ Address : "has"
    User ||--o{ ProductReview : "writes"
    ProductReview }o--|| Product : "reviews"
```

---

## Checkout Sequence

```mermaid
sequenceDiagram
    actor User
    participant Client
    participant Server
    participant PayPal
    participant DB

    User->>Client: Click "Place Order"
    Client->>Server: POST /api/shop/orders
    Server->>PayPal: Create PayPal order
    PayPal-->>Server: Return approval URL
    Server->>DB: Save order (paymentStatus: pending)
    Server-->>Client: Return approval URL
    Client->>PayPal: Redirect user to approve payment
    PayPal-->>Client: Redirect back with paymentId & payerId
    Client->>Server: POST /api/shop/orders/capture-payment/:userId
    Server->>PayPal: Capture payment
    PayPal-->>Server: Payment confirmed
    Server->>DB: Update order (paymentStatus: paid, orderStatus: confirmed)
    Server->>DB: Decrease product stock
    Server->>DB: Clear cart
    Server-->>Client: Order confirmed
    Client-->>User: Show success page
```

---


## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)
- Cloudinary account
- PayPal developer account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of `e-commerce-server/`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/e-commerce
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### Running the server

```bash
# Development (with file watching)
npm run dev

# Production
npm start
```

---

## API Documentation

Interactive Swagger UI is available at:

```
http://localhost:3000/api/docs
```

---
