import time, random, requests

URL = "http://localhost:8000/vitals"

def generate_data():
    return {
        "patient_id": "Razvan Balan",
        "heart_rate": random.randint(60, 160),
        "bp_sys": random.randint(90, 160),
        "bp_dia": random.randint(60, 100),
        "spo2": round(random.uniform(85, 100), 2),
    }

while True:
    data = generate_data()
    try:
        requests.post(URL, json=data)
        print("Trimis:", data)
    except Exception as e:
        print("Eroare:", e)
    time.sleep(1)


# uvicorn api_server:app --reload