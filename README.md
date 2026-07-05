# SkyMart ERP - Inventory & Sales Management System Backend 🚀

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A robust, scalable backend service built to power the SkyMart Mini ERP. This system seamlessly handles product inventory, customer tracking, complex sales logic, and high-level dashboard analytics while enforcing strict role-based access control and atomic database operations.

---

## 🔗 Live Links
- **Live API URL:** `[Placeholder: Insert your Vercel/Render URL here]`
- **Interactive Postman API Docs:** `[Placeholder: Insert your published Postman Document link here]`

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Validation:** Zod (v4 implementation)
- **Media Storage:** Cloudinary + Multer
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## ✨ Key Features
- 🔐 **Role-Based Access Control (RBAC):** Granular authorization middleware restricting endpoints by three distinct roles: `admin`, `manager`, and `employee`.
- ☁️ **Cloudinary Image Uploads:** Seamless multipart form-data processing via Multer, directly streaming product images securely into Cloudinary.
- ⚡ **Atomic MongoDB Transactions:** Ensures absolute consistency during `Sales` processing. Product stock is instantly checked and decremented securely within a transaction session, preventing over-selling and maintaining perfect inventory states.
- 🔍 **Generic QueryBuilder:** A highly reusable, dynamic query constructor that effortlessly provides sorting, filtering, searching, and pagination across major collections.
- 🛡️ **Global Error Handling:** Cleanly structured interception of Mongoose Validation/Cast errors, `E11000` duplicate key parsing, JWT expiration/invalidity intercepts, and custom `AppError` throws—all returning a predictable JSON schema.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

| Variable Name | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | The port the server runs on | `5000` |
| `DATABASE_URL` | MongoDB connection string (Replica Set required for transactions) | `mongodb+srv://...` |
| `BCRYPT_SALT_ROUNDS` | Rounds for password hashing | `12` |
| `JWT_ACCESS_SECRET` | Secret key for JWT access tokens | `your_super_secret_key` |
| `JWT_ACCESS_EXPIRES_IN` | Token expiration time | `1d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Account Cloud Name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |

---

## 🚀 Local Installation & Setup

Follow these steps to run the SkyMart ERP server locally on your machine.

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd SkyMart-ERP-Server
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
- Create a `.env` file at the root.
- Copy the structure from the **Environment Variables** section above and fill in your credentials.
> **Note:** MongoDB Transactions require a replica set. If testing locally, ensure you use MongoDB Atlas (which runs a replica set by default).

**4. Run the development server**
```bash
npm run dev
```

**5. Build for Production**
```bash
npm run build
```

---

## 🔑 Admin Login Credentials

Use the following credentials to log in and test protected routes requiring `admin` authorization:

```json
{
  "email": "admin@skymart.com",
  "password": "securepassword123"
}
```
*Note: Make sure to hit the `/api/auth/login` endpoint to receive your Bearer Token, which you will need to attach as an `Authorization` header (`Bearer <token>`) for protected routes.*

---

## 📖 API Documentation Reference

For an extensive, endpoint-by-endpoint breakdown including required roles, request body structures (JSON and FormData), and exact response examples, please refer to the dedicated [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) file located in the root of this repository.
