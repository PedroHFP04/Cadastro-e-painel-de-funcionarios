from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    department = Column(String)
    records = relationship("Record", back_populates="employee")

class Record(Base):
    __tablename__ = "records"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    reference_date = Column(Date, index=True)
    deliveries = Column(Integer, nullable=False)
    observation = Column(Text, nullable=True)
    
    employee = relationship("Employee", back_populates="records")