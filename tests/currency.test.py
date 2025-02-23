import requests

# Defining the microservice endpoint
CURRENCY_MICROSERVICE_URL = "http://localhost:3000/generate_currency"

# Sample test cases
test_cases = [
    {"level": 5, "members": 2, "reduce": False},
    {"level": 10, "members": 4, "reduce": True},
    {"level": 15, "members": 3, "reduce": False}
]

print("🔹 Testing Currency Generator Microservice...\n")

for test in test_cases:
    params = {
        "level": test["level"],
        "members": test["members"],
        "reduce": str(test["reduce"]).lower()
    }

    # Construct full URL for logging/debugging
    full_url = f"{CURRENCY_MICROSERVICE_URL}?level={params['level']}&members={params['members']}&reduce={params['reduce']}"
    
    print(f"➡️ Sending Request: {full_url}")
    
    try:
        response = requests.get(full_url)
        if response.status_code == 200:
            print(f"Response: {response.json()}\n")
        else:
            print(f"Error: {response.status_code} - {response.text}\n")
    
    except requests.exceptions.RequestException as e:
        print(f"Microservice not reachable: {e}\n")

print("Test Completed!")
