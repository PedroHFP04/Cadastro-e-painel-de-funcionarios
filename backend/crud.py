from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas

def create_record(db: Session, record: schemas.RecordCreate):
    
    employee = db.query(models.Employee).filter(models.Employee.name == record.name).first()
    if not employee:
        employee = models.Employee(name=record.name, department=record.department)
        db.add(employee)
        db.commit()
        db.refresh(employee)

    db_record = models.Record(
        employee_id=employee.id,
        reference_date=record.reference_date,
        deliveries=record.deliveries,
        observation=record.observation
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_records(db: Session):
    return db.query(models.Record).order_by(models.Record.reference_date.desc()).all()

def get_summary(db: Session):
    total_records = db.query(models.Record).count()
    total_deliveries = db.query(func.sum(models.Record.deliveries)).scalar() or 0
    return {"total_records": total_records, "total_deliveries": total_deliveries}