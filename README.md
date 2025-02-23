# Currency Generator Microservice

## Overview
This microservice generates randomized currency loot (gold, silver, copper) for RPG games based on:
- Character Level (1-20) → Determines loot value.
- Party Size (1-6) → Scales loot for the group.
- Optional Auto-Conversion (`reduce=true`) → Converts coins automatically (10 cp → 1 sp, 10 sp → 1 gp).

It is built with Node.js and Express.js and returns data in JSON format.

---

## **Project Structure**
```
microservice-a/
│── node_modules/       # Installed dependencies (auto-generated)
│── src/                # Source files
│   │── routes/         # Route handlers
│   │   ├── currency.js # Handles currency generation logic
│   │── utils/          # Utility functions
│   │   ├── logger.js   # Logging system (errors & requests)
│   │── config.js       # Configuration settings
│   │── server.js       # Main entry point
│── tests/              # Unit tests for currency logic
│   │── currency.test.js
│── .env                # Environment variables (PORT)
│── .gitignore          # Ignores node_modules, logs, etc.
│── package.json        # Project metadata & dependencies
│── package-lock.json   # Dependency lock file
│── README.md           # Documentation
│── logs.txt            # Log file
```

---

## **Installation & Setup**

### **1. Prerequisites**
- **Node.js** (>=16.x)
- **npm** (>=8.x)

### **2. Clone the Repository**
This assumes you are downloading the microservice directly from my GitHub repository.

```sh
git clone https://github.com/juangpartida/microservice-a.git
cd microservice-a
```

### **3. Install Dependencies**
```sh
npm install
```

### **4. Start the Microservice**
```sh
npm start
```
This runs `node src/server.js`, which starts the API.

### **5. Test the API**
Open a browser or use Postman:
```bash
http://localhost:3000/generate_currency?level=10&members=3&reduce=true
```


---

##  **Error Handling**
| Scenario                        | Example Request                            | Response |
|---------------------------------|---------------------------------|-----------|
|  Invalid Level (out of range) | `/generate_currency?level=25&members=3` | `{ "error": "Level must be between 1 and 20." }` |
|  Invalid Members (out of range) | `/generate_currency?level=5&members=7` | `{ "error": "Party members must be between 1 and 6." }` |
|  Missing Parameters | `/generate_currency?level=5` | `{ "error": "Party members must be between 1 and 6." }` |



## How to Programmatically **REQUEST** Data

Send an HTTP GET request to:
`http://localhost:3000/generate_currency`

### Required Query Parameters:
| Parameter | Type    | Required | Description                                 |
|-----------|---------|----------|---------------------------------------------|
| `level`   | Integer | Yes      | The level of the player (1-20)              |
| `members` | Integer | Yes      | The size of the party (1-6)                 |
| `reduce`  | Boolean | No       | If true, consolidates coin denominations    |

### ** Example Request:**
```bash
http://localhost:3000/generate_currency?level=5&members=2&reduce=true
```

### ** Example Response (`reduce=false` - No Conversion):**
```json
{
    "coins": {
        "gp": 30,
        "sp": 12,
        "cp": 6
    }
}
```

### ** Example Response (`reduce=true` - Auto-conversion applied):**
```json
{
    "coins": {
        "gp": 31,
        "sp": 2,
        "cp": 6
    }
}
```
### Example Request (Python Code):

```python
import requests

# Define endpoint and parameters
url = "http://localhost:3000/generate_currency"
params = {
    "level": 10,
    "members": 3,
    "reduce": "false"
}

# Make a GET request
response = requests.get(url, params=params)

# Print response
if response.status_code == 200:
    print("Response:", response.json())
else:
    print("Error:", response.status_code)
```

---

## How to Programmatically **RECEIVE** Data

### Example JSON Response:
```json
{
  "coins": {
    "gp": 240,
    "sp": 90,
    "cp": 48
  }
}
```

### How to Process the Data (Python Example):
```python
# Assuming 'response' contains the JSON data
currency_data = response.json()

# Extract the coins
gp = currency_data['coins']['gp']
sp = currency_data['coins']['sp']
cp = currency_data['coins']['cp']

# Display the values
print(f"Gold: {gp}, Silver: {sp}, Copper: {cp}")
```

## UML Diagram (IP)




