## Name: Davi de Rezende Sobral
## Student number: 8944633

# Inventory Management System

This project is an Inventory Management System built using Node.js, Express, Sequelize, and PostgreSQL. It allows users to manage inventory items through a web interface.

## Features

- List all inventory items
- Add a new inventory item
- Edit an existing inventory item
- Delete an inventory item
- Sell an inventory item
- View sales transactions
- View ledger report

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

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a .env file in the root directory with your PostgreSQL database URL:
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

6. Open your web browser and navigate to http://localhost:3000.

### Usage

- **Add Item**: Navigate to the "Add Item" page to add a new inventory item.
- **Edit Item**: Click the "Edit" button next to an item to edit its details.
- **Delete Item**: Click the "Delete" button next to an item to remove it from the inventory.
- **Sell Item**: Click the "Sell Item" button at the top to sell an inventory item.
- **View Sales**: Click the "View Sales" button at the top to view all sales transactions.
- **View Ledger**: Click the "View Ledger" button at the top to view the ledger report.

### Additional Information

- **Sell Item**: When selling an item, if there is not enough stock available, a red error message will be displayed under the "Quantity Sold" input field.
- **Ledger Report**: The ledger report includes debit entries when items are added and credit entries when items are sold. The balance reflects the value of the remaining stock.