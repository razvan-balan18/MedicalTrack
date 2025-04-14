from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Vital(Base):
    __tablename__ = "vitals"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String)
    heart_rate = Column(Integer)
    bp_sys = Column(Integer)
    bp_dia = Column(Integer)
    spo2 = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
