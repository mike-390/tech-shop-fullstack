# TechShop Project

A Full Stack E-commerce application built to demonstrate the integration between a Spring Boot backend and a React frontend. The app handles user authentication, product management, and order processing.

## 🛠 Tech Stack

* **Backend:** Java 17, Spring Boot, Spring Security (JWT), Hibernate/JPA.
* **Database:** PostgreSQL.
* **Frontend:** React.js, Tailwind CSS, Axios, Context API.
* **Tools:** Maven, Git, Postman/Insomnia.

## 💻 Features

Currently, the application supports:

* **Authentication:** Users can Register and Login (JWT based).
* **Product Browsing:** View products and filter by categories (Smartphones, Laptops, etc.).
* **Shopping Cart:** Add/Remove items and calculate totals dynamically.
* **Checkout:** Users can place orders (saved to the database).
* **Admin Panel:** Admin users can add new products to the store.
* **Security:** Protected routes for Checkout and Admin actions.

## ⚙️ How to Run

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/tech-shop-fullstack.git](https://github.com/YOUR_USERNAME/tech-shop-fullstack.git)
    ```

2.  **Backend:**
    * Open the `backend` folder in IntelliJ IDEA.
    * Update `application.properties` with your PostgreSQL credentials.
    * Run the main class `TechShopApplication`.

3.  **Frontend:**
    * Open the `frontend` folder in VS Code.
    * Install dependencies: `npm install`
    * Start the app: `npm run dev`
