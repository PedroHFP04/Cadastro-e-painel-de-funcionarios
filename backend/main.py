from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Indicadores de Funcionários")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/records")
def create_record(record: schemas.RecordCreate, db: Session = Depends(get_db)):
    return crud.create_record(db=db, record=record)

@app.get("/records")
def list_records(db: Session = Depends(get_db)):
    records = crud.get_records(db)

    return [
        {
            "id": r.id,
            "name": r.employee.name,
            "department": r.employee.department,
            "reference_date": r.reference_date,
            "deliveries": r.deliveries,
            "observation": r.observation
        }
        for r in records
    ]

@app.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)