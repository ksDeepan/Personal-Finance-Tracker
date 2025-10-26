from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ArchiveTransaction(Base):
    __tablename__ = "archive_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    created_at = Column(DateTime(timezone=True))
