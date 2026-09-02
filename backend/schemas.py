from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class RecordCreate(BaseModel):
    name: str
    department: str
    reference_date: date
    deliveries: int = Field(ge=0) 
    observation: Optional[str] = None