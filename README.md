# Inventory Management System

This project is an Inventory Management System built using Node.js, Express, Sequelize, and PostgreSQL. It allows users to manage inventory items through a web interface.

## Features

- List all inventory items
- Add a new inventory item
- Edit an existing inventory item
- Delete an inventory item

## Technologies Used

- Node.js
- Express
- Sequelize
- PostgreSQL (hosted on Neon.tech)
- EJS (Embedded JavaScript templates)
- Bootstrap (for styling)

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL database instance (e.g., Neon.tech)

### Installation

1. Clone this repository
   ```sh
   git clone https://github.com/your-username/inventory-management-system.git
   cd inventory-management-system
   ```

2. Install dependecies:
   ```sh
   npm install
   ```

3. Create a .env file in the reoot directory with your PostgresSQL database URL:
   ```sh
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

4. Run the data migration script to populate the database:
   ```sh
   node scripts/migrateData.js
   ```
5. Start the application:
   ```sh
   node app.js
   ```

6. Open your web browse and navigate to https://localhost:3000.
   
