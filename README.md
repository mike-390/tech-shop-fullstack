# 🛒 TechShop Project

A Full Stack E-commerce application built to demonstrate the integration between a Spring Boot backend and a React frontend. The app handles user authentication, product management, and complete order lifecycle management with a modern, high-tech UI.

## 🚀 Admin Access (Demo)

To explore the Admin Dashboard features (Manage Products & Orders), use the following credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@techshop.com` | `admin123` |

## 🛠 Tech Stack

* **Backend:** Java 17, Spring Boot, Spring Security (JWT), Hibernate/JPA.
* **Database:** PostgreSQL.
* **Frontend:** React.js, Tailwind CSS, Axios, Context API, Three.js (for 3D visuals).
* **Tools:** Maven, Git, Postman/Insomnia.

## 💻 Features

Currently, the application supports:

* **Authentication:** Users can Register and Login (JWT based).
* **Product Browsing:** View products and filter by categories (Smartphones, Laptops, etc.).
* **Shopping Cart:** Add/Remove items and calculate totals dynamically.
* **User Order History:** Logged-in users can view their personal order history and track the status of active orders (e.g., **Pending**).
* **Admin Dashboard:**
    * **Product Management:** Add, Edit, and Delete products.
    * **Order Management:** View and manage all customer orders across the platform.
* **Security:** Protected routes for Checkout and Admin actions.
* **Immersive UI:** High-tech visuals with 3D elements (Grid Scan) and animations.

## ⚙️ How to Run

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/mike-390/tech-shop-fullstack.git](https://github.com/mike-390/tech-shop-fullstack.git)
    ```

2.  **Backend:**
    * Open the `backend` folder in IntelliJ IDEA.
    * Update `application.properties` with your PostgreSQL credentials.
    * Run the main class `TechShopApplication`.

3.  **Frontend:**
    * Open the `frontend` folder in VS Code.
    * Install dependencies (including 3D libraries):
      ```bash
      npm install
      ```
    * Start the app:
      ```bash
      npm run dev
      ```