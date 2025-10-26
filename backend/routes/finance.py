from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Transaction
from database import get_db

router = APIRouter()

@router.post("/transactions")
def add_transaction(data: dict, db: Session = Depends(get_db)):
    try:
        transaction = Transaction(
            description=data["description"],
            amount=float(data["amount"]),
            category=data["category"]
        )
        db.add(transaction)
        db.commit()
        db.refresh(transaction)
        return {"message": "Transaction saved", "transaction": transaction.id}
    except Exception as e:
        db.rollback()
        return {"error": f"Error saving: {str(e)}"}
