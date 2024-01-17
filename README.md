# Ecommerce-Website
This repository contains the source code for an ecommerce website designed specifically for clothing products. The goal of this project is to provide a user-friendly and efficient platform for customers to browse and purchase clothes online.

Note: Please be aware that this project does not implement Spring Security for authentication and authorization.

## Technologies Used
The following technologies and dependencies were used in the development of this application:

**Backend:**
- Spring Boot: A Java framework for building web applications.
- Spring Data JPA: A Spring framework module that provides JPA (Java Persistence API) support.
- Spring Web: A Spring framework module for building web applications.
- MySQL Driver: A JDBC driver for connecting to a MySQL database.

**Frontend:**
- Angular 15: A JavaScript/TypeScript framework for building web applications.
- Bootstrap: A popular CSS framework for designing responsive web pages.

## Backend Setup
To set up the backend, follow these steps:

1. Ensure you have Java Development Kit (JDK) and Apache Maven installed.
2. Import the `backend` folder as a Maven project in your preferred IDE.
3. Update the MySQL database configuration in `application.properties` file located in `src/main/resources` directory.
4. Run the `EcommerceApplication.java` file to start the backend server.

## Frontend Setup
To set up the frontend, follow these steps:

1. Ensure you have Node.js and npm (Node Package Manager) installed.
2. Open the `frontend` folder in your preferred code editor.
3. Run `npm install` to install the required dependencies.
4. Update the API endpoint in the Angular service files to match the backend server address.
5. Run `ng serve` to start the frontend development server.

Note: Due to time constraints, full implementation of product images is pending , a workaround has been implemented. Place the product images in src/assets/img/products folder in the frontend directory before uploading a product's image when adding or updating a product.

## Usage
After setting up the backend and frontend, you can access the application by visiting http://localhost:4200 in your web browser. From there, you can browse and interact with the website.

## Conclusion
This README provides an overview of the ecommerce website for clothes built using Spring Boot and Angular 15. It explains the technologies used, project structure, backend and frontend setup instructions, and usage guidelines. Please note that this project does not include Spring Security for authentication and authorization, and a workaround has been implemented for product images placement in the frontend folder.
