# ThreatFox IOC API

A RESTful API for managing ThreatFox Indicators of Compromise (IOCs) including SHA256 hashes, malicious URLs, and IP:Port combinations.
## Postman docs

https://documenter.getpostman.com/view/50634891/2sB3dPTr4o

## Features

- **3 Resource Types**: SHA256 hashes, URLs, and IP:Port combinations
- **Full CRUD Operations**: Create, Read, Update, and Delete for all resources
- **Advanced Filtering**: Query by threat type, malware, reporter, and confidence level
- **Pagination**: Efficient data retrieval with customizable page sizes
- **Data Validation**: Automatic validation of IOC formats and constraints
- **Error Handling**: Comprehensive error responses with meaningful messages
- **Testing**: Unit tests for all CRUD operations using Jest and Supertest

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with Sequelize ORM
- **Testing**: Jest + Supertest
- **Environment**: dotenv for configuration

## Project Structure

```
threatfox-ioc-api/
├── database/
│   ├── models/
│   │   ├── Sha256.js       # SHA256 hash model
│   │   ├── Url.js          # URL model
│   │   ├── IpPort.js       # IP:Port model
│   │   └── index.js        # Model exports
│   ├── config.js           # Database configuration
│   ├── setup.js            # Database initialization script
│   └── seed.js             # Data seeding script
├── routes/
│   ├── sha256Routes.js     # SHA256 CRUD endpoints
│   ├── urlRoutes.js        # URL CRUD endpoints
│   └── ipPortRoutes.js     # IP:Port CRUD endpoints
├── middleware/
│   ├── logger.js           # Request logging
│   └── errorHandler.js     # Error handling
├── tests/
│   ├── sha256.test.js      # SHA256 tests
│   ├── url.test.js         # URL tests
│   └── ipPort.test.js      # IP:Port tests
├── server.js               # Main application entry point
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sdgsdgfsd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run setup
   ```

4. **Seed the database with CSV data**
   ```bash
   npm run seed
   ```
   This will import data from:
   - `full_sha256.csv`
   - `full_urls.csv`
   - `full_ip-port.csv`

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Run tests**
   ```bash
   npm test
   ```

The API will be available at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000
```

### Root Endpoint

#### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "ThreatFox IOC API",
  "version": "1.0.0",
  "endpoints": {
    "sha256": "/api/sha256",
    "urls": "/api/urls",
    "ipports": "/api/ipports"
  }
}
```

---

## SHA256 Hash Endpoints

### GET /api/sha256
Retrieve all SHA256 hashes with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `threat_type` (optional): Filter by threat type
- `malware` (optional): Filter by malware name (partial match)
- `reporter` (optional): Filter by reporter name
- `min_confidence` (optional): Minimum confidence level (0-100)

**Example Request:**
```bash
GET /api/sha256?page=1&limit=10&threat_type=payload&min_confidence=90
```

**Response:**
```json
{
  "total": 150,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": 1,
      "ioc_id": "1667148",
      "ioc_value": "4ac33e95d7d1bf205c8bd021886a8edc5d405d65389edb3b0c65d62c12ace47d",
      "threat_type": "payload",
      "malware": "win.stealc",
      "malware_printable": "Stealc",
      "confidence_level": 95,
      "first_seen_utc": "2025-12-04T06:09:51.000Z",
      "last_seen_utc": null,
      "reference": "https://analytics.dugganusa.com/api/v1/stix-feed",
      "tags": "dugganusa,github,pattern-38,stealc,supply-chain",
      "reporter": "duggusa",
      "createdAt": "2025-12-07T15:30:00.000Z",
      "updatedAt": "2025-12-07T15:30:00.000Z"
    }
  ]
}
```

### GET /api/sha256/:id
Retrieve a single SHA256 hash by ID.

**Example Request:**
```bash
GET /api/sha256/1
```

**Response:**
```json
{
  "id": 1,
  "ioc_id": "1667148",
  "ioc_value": "4ac33e95d7d1bf205c8bd021886a8edc5d405d65389edb3b0c65d62c12ace47d",
  "threat_type": "payload",
  "malware": "win.stealc",
  "malware_printable": "Stealc",
  "confidence_level": 95,
  "first_seen_utc": "2025-12-04T06:09:51.000Z",
  "last_seen_utc": null,
  "reference": "https://analytics.dugganusa.com/api/v1/stix-feed",
  "tags": "dugganusa,github,pattern-38,stealc,supply-chain",
  "reporter": "duggusa",
  "createdAt": "2025-12-07T15:30:00.000Z",
  "updatedAt": "2025-12-07T15:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Not Found",
  "message": "SHA256 hash not found"
}
```

### POST /api/sha256
Create a new SHA256 hash entry.

**Request Body:**
```json
{
  "ioc_id": "TEST001",
  "ioc_value": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "threat_type": "payload",
  "malware": "test.malware",
  "malware_printable": "Test Malware",
  "confidence_level": 95,
  "first_seen_utc": "2025-12-07T10:00:00.000Z",
  "reporter": "test_user",
  "tags": "test,sample",
  "reference": "https://example.com/reference"
}
```

**Response (201):**
```json
{
  "id": 101,
  "ioc_id": "TEST001",
  "ioc_value": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "threat_type": "payload",
  "malware": "test.malware",
  "malware_printable": "Test Malware",
  "confidence_level": 95,
  "first_seen_utc": "2025-12-07T10:00:00.000Z",
  "reporter": "test_user",
  "tags": "test,sample",
  "reference": "https://example.com/reference",
  "createdAt": "2025-12-07T15:30:00.000Z",
  "updatedAt": "2025-12-07T15:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Validation Error",
  "message": "Validation len on ioc_value failed"
}
```

### PUT /api/sha256/:id
Update an existing SHA256 hash entry.

**Request Body:**
```json
{
  "confidence_level": 100,
  "tags": "updated,verified"
}
```

**Response (200):**
```json
{
  "id": 1,
  "ioc_id": "1667148",
  "ioc_value": "4ac33e95d7d1bf205c8bd021886a8edc5d405d65389edb3b0c65d62c12ace47d",
  "threat_type": "payload",
  "malware": "win.stealc",
  "malware_printable": "Stealc",
  "confidence_level": 100,
  "first_seen_utc": "2025-12-04T06:09:51.000Z",
  "last_seen_utc": null,
  "reference": "https://analytics.dugganusa.com/api/v1/stix-feed",
  "tags": "updated,verified",
  "reporter": "duggusa",
  "createdAt": "2025-12-07T15:30:00.000Z",
  "updatedAt": "2025-12-07T16:00:00.000Z"
}
```

### DELETE /api/sha256/:id
Delete a SHA256 hash entry.

**Response (204):**
No content

**Error Response (404):**
```json
{
  "error": "Not Found",
  "message": "SHA256 hash not found"
}
```

---

## URL Endpoints

### GET /api/urls
Retrieve all URLs with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `threat_type` (optional): Filter by threat type
- `malware` (optional): Filter by malware name (partial match)
- `reporter` (optional): Filter by reporter name
- `min_confidence` (optional): Minimum confidence level (0-100)

**Example Request:**
```bash
GET /api/urls?threat_type=payload_delivery&limit=20
```

**Response:**
```json
{
  "total": 85,
  "page": 1,
  "limit": 20,
  "data": [
    {
      "id": 1,
      "ioc_id": "1668950",
      "ioc_value": "http://195.133.9.204/skare.odd",
      "threat_type": "payload_delivery",
      "malware": "unknown",
      "malware_printable": "Unknown malware",
      "confidence_level": 100,
      "first_seen_utc": "2025-12-07T13:05:49.000Z",
      "last_seen_utc": null,
      "reference": "",
      "tags": "ClickFix,Fake OS Update,xHamster",
      "reporter": "HuntYethHounds",
      "createdAt": "2025-12-07T15:30:00.000Z",
      "updatedAt": "2025-12-07T15:30:00.000Z"
    }
  ]
}
```

### GET /api/urls/:id
Retrieve a single URL by ID.

**Example Request:**
```bash
GET /api/urls/1
```

### POST /api/urls
Create a new URL entry.

**Request Body:**
```json
{
  "ioc_id": "TEST_URL001",
  "ioc_value": "http://malicious-site.com/payload",
  "threat_type": "payload_delivery",
  "malware": "test.malware",
  "malware_printable": "Test Malware",
  "confidence_level": 90,
  "first_seen_utc": "2025-12-07T10:00:00.000Z",
  "reporter": "test_user"
}
```

**Response (201):**
Returns the created URL object.

### PUT /api/urls/:id
Update an existing URL entry.

### DELETE /api/urls/:id
Delete a URL entry.

---

## IP:Port Endpoints

### GET /api/ipports
Retrieve all IP:Port combinations with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `threat_type` (optional): Filter by threat type
- `malware` (optional): Filter by malware name (partial match)
- `reporter` (optional): Filter by reporter name
- `min_confidence` (optional): Minimum confidence level (0-100)

**Example Request:**
```bash
GET /api/ipports?threat_type=botnet_cc&min_confidence=75
```

**Response:**
```json
{
  "total": 200,
  "page": 1,
  "limit": 50,
  "data": [
    {
      "id": 1,
      "ioc_id": "1668961",
      "ioc_value": "138.226.236.41:8443",
      "threat_type": "botnet_cc",
      "malware": "elf.mirai",
      "malware_printable": "Mirai",
      "confidence_level": 75,
      "first_seen_utc": "2025-12-07T15:06:25.000Z",
      "last_seen_utc": null,
      "reference": "https://bazaar.abuse.ch/sample/6a1f3f2805f56b4e7fcf6e8c15542754442b33af9451ff300d446a24b5289e4b/",
      "tags": "Mirai",
      "reporter": "abuse_ch",
      "createdAt": "2025-12-07T15:30:00.000Z",
      "updatedAt": "2025-12-07T15:30:00.000Z"
    }
  ]
}
```

### GET /api/ipports/:id
Retrieve a single IP:Port by ID.

**Example Request:**
```bash
GET /api/ipports/1
```

### POST /api/ipports
Create a new IP:Port entry.

**Request Body:**
```json
{
  "ioc_id": "TEST_IP001",
  "ioc_value": "192.168.1.1:8080",
  "threat_type": "botnet_cc",
  "malware": "test.malware",
  "malware_printable": "Test Malware",
  "confidence_level": 85,
  "first_seen_utc": "2025-12-07T10:00:00.000Z",
  "reporter": "test_user"
}
```

**Response (201):**
Returns the created IP:Port object.

### PUT /api/ipports/:id
Update an existing IP:Port entry.

### DELETE /api/ipports/:id
Delete an IP:Port entry.

---

## Error Responses

The API uses standard HTTP status codes and returns errors in JSON format:

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Validation len on ioc_value failed"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Duplicate Entry",
  "message": "A record with this value already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Data Models

### SHA256 Hash
- `id`: Integer (Primary Key)
- `ioc_id`: String (Unique)
- `ioc_value`: String (64 characters, hex)
- `threat_type`: String
- `malware`: String (nullable)
- `malware_printable`: String (nullable)
- `confidence_level`: Integer (0-100)
- `first_seen_utc`: Date
- `last_seen_utc`: Date (nullable)
- `reference`: Text (nullable)
- `tags`: Text (nullable)
- `reporter`: String

### URL
- `id`: Integer (Primary Key)
- `ioc_id`: String (Unique)
- `ioc_value`: Text (Valid URL)
- `threat_type`: String
- `malware`: String (nullable)
- `malware_printable`: String (nullable)
- `confidence_level`: Integer (0-100)
- `first_seen_utc`: Date
- `last_seen_utc`: Date (nullable)
- `reference`: Text (nullable)
- `tags`: Text (nullable)
- `reporter`: String

### IP:Port
- `id`: Integer (Primary Key)
- `ioc_id`: String (Unique)
- `ioc_value`: String (Format: IP:Port)
- `threat_type`: String
- `malware`: String (nullable)
- `malware_printable`: String (nullable)
- `confidence_level`: Integer (0-100)
- `first_seen_utc`: Date
- `last_seen_utc`: Date (nullable)
- `reference`: Text (nullable)
- `tags`: Text (nullable)
- `reporter`: String

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Creating resources (POST)
- Retrieving all resources (GET)
- Retrieving single resources (GET by ID)
- Updating resources (PUT)
- Deleting resources (DELETE)
- Error handling (validation, not found)

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DB_PATH=./database/threatfox.db
```

## License

MIT

## Data Source

This project uses data from [ThreatFox](https://threatfox.abuse.ch/) by abuse.ch.
