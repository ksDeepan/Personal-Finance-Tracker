from fastapi import APIRouter

router = APIRouter(prefix="/categories", tags=["Categories"])

CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Salary", "Others"]

@router.get("/")
def get_categories():
    return CATEGORIES
