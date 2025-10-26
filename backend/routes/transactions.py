from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import extract
from database import get_db
from models import Transaction, ArchiveTransaction
from schemas import TransactionCreate

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post("/", status_code=201)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    new_trans = Transaction(
        type=data.type,
        amount=data.amount,
        category=data.category,
        description=data.description
    )
    db.add(new_trans)
    db.commit()
    db.refresh(new_trans)
    return {"message": "Transaction saved ✅", "id": new_trans.id}


@router.get("/", status_code=200)
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()


@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    trans = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    
    if not trans:
        return {"error": "Transaction not found"}

    db.delete(trans)
    db.commit()
    return {"message": "Deleted successfully ✅"}


# ✅ Archive old transactions (Option 2)
@router.post("/archive_old", status_code=200)
def archive_old_transactions(db: Session = Depends(get_db)):
    current_year = datetime.utcnow().year
    current_month = datetime.utcnow().month

    old_transactions = db.query(Transaction).filter(
        (extract('year', Transaction.created_at) != current_year) |
        (extract('month', Transaction.created_at) != current_month)
    ).all()

    if not old_transactions:
        return {"message": "No old transactions to archive ✅"}

    # Move to archive table
    for trans in old_transactions:
        archive = ArchiveTransaction(
            type=trans.type,
            amount=trans.amount,
            category=trans.category,
            description=trans.description,
            created_at=trans.created_at
        )
        db.add(archive)
        db.delete(trans)

    db.commit()
    return {"message": "Old transactions archived successfully ✅"}


# ✅ View archived transactions
@router.get("/archives", status_code=200)
def get_archives(db: Session = Depends(get_db)):
    return db.query(ArchiveTransaction).all()
