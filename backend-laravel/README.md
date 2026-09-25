# AuraCV Studio — MySQL & PHP Laravel Standalone Backend

This directory contains the production-ready Laravel backend and MySQL database configuration to run AuraCV as a standalone full-stack platform with PHP and MySQL.

---

### 1. Requirements
- **PHP** >= 8.1 (with `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`)
- **Composer** (v2+)
- **MySQL** >= 5.7 or 8.0 (or MariaDB >= 10.3)

---

### 2. Quick Setup Instructions

#### Step A: Configure MySQL Database
Create your MySQL database in phpMyAdmin, MySQL Workbench, or via terminal:
```sql
CREATE DATABASE auracv_resumes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Step B: Install Dependencies & Run Migration
In your Laravel project root:
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations to construct the tables in MySQL
php artisan migrate
```

#### Step C: Start Laravel Backend Server
```bash
php artisan serve --port=8000
```
Your standalone API will now be running at: `http://localhost:8000/api/v1/resumes`

---

### 3. API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/resumes` | Retrieve all saved resumes from MySQL |
| `POST` | `/api/v1/resumes` | Store a new resume in MySQL |
| `GET` | `/api/v1/resumes/{uuid}` | Fetch a single resume by UUID |
| `PUT` | `/api/v1/resumes/{uuid}` | Update resume details and settings |
| `DELETE` | `/api/v1/resumes/{uuid}` | Delete resume record from MySQL |
| `POST` | `/api/v1/resumes/clear-database` | Clear all resumes (fresh website reset) |

---

### 4. Direct SQL Schema Import (Alternative without Laravel)
If you prefer pure MySQL / PHP without Laravel, import the SQL schema file directly:
```bash
mysql -u root -p auracv_resumes < database/mysql_schema.sql
```
