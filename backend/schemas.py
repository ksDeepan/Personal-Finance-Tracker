from pydantic import BaseModel
from datetime import datetime

class TransactionBase(BaseModel):
    type: str
    amount: float
    category: str
    description: str | None = None

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
