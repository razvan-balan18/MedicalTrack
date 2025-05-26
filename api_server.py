from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from alert_logic import check_alert
from models import Vital
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS pentru React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite conexiunea cu frontend-ul React
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelul de date pentru input
class VitalsIn(BaseModel):
    patient_id: str
    heart_rate: int
    bp_sys: int
    bp_dia: int
    spo2: float

# Funcția pentru conectarea la baza de date
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/vitals")
def receive_vitals(data: VitalsIn, db: Session = Depends(get_db)):
    vitals = Vital(**data.dict())  # Creează un obiect de tip Vital
    db.add(vitals)  # Adaugă datele în baza de date
    db.commit()  # Salvează modificările

    # Verifică dacă există un alert (ex: ritm cardiac prea mare, etc.)
    alert = check_alert(data)
    if alert:
        # Dacă alerta este activată, poți adăuga logică suplimentară
        print(f"Alertă activată pentru pacientul {data.patient_id}")

    return {"status": "ok", "alert": alert}

# Endpoint pentru exportul datelor în format JSON
@app.get("/export/json")
def export_json(db: Session = Depends(get_db)):
    records = db.query(Vital).all()  # Interoghează toate datele din baza de date
    # Returnează datele într-o formă ușor de folosit (convertește obiectele în dicționare)
    return [r.__dict__ for r in records]

@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Vital.patient_id).distinct().all()
    return {"patients": [patient[0] for patient in patients]}

@app.get("/vitals/{patient_id}")
def get_vitals_for_patient(patient_id: str, db: Session = Depends(get_db)):
    vitals = db.query(Vital).filter(Vital.patient_id == patient_id).all()
    return [{"id": i, "heart_rate": v.heart_rate, "bp_sys": v.bp_sys, "bp_dia": v.bp_dia, "spo2": v.spo2, "timestamp": v.timestamp} for i, v in enumerate(vitals)]
