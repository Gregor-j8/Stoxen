from sqlalchemy import (Column, Integer, String, Numeric, ForeignKey, DateTime, Enum, UniqueConstraint, Boolean)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    disabled = Column(Boolean, default=False)
    
    portfolio = relationship("Portfolio", back_populates="user", uselist=False)

class Portfolio(Base):
    __tablename__ = 'portfolios'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    cash_balance = Column(Numeric(12, 2), default=100000.00)
    created_at = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="portfolio")
    holdings = relationship("Holding", back_populates="portfolio", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="portfolio", cascade="all, delete-orphan")
    snapshots = relationship("PortfolioSnapshot", back_populates="portfolio", cascade="all, delete-orphan")

class Holding(Base):
    __tablename__ = 'holdings'
    __table_args__ = (UniqueConstraint('portfolio_id', 'ticker', name='unique_ticker_per_portfolio'),)

    id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    ticker = Column(String(10), nullable=False)
    shares = Column(Numeric(12, 4), nullable=False)
    avg_cost = Column(Numeric(12, 4), nullable=False)

    portfolio = relationship("Portfolio", back_populates="holdings")

    
class TransactionType(enum.Enum):
    BUY = 'buy'
    SELL = 'sell'

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    type = Column(Enum(TransactionType), nullable=False)
    ticker = Column(String(10), nullable=False)
    shares = Column(Numeric(12, 4), nullable=False)
    price = Column(Numeric(12, 4), nullable=False)
    total = Column(Numeric(14, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    portfolio = relationship("Portfolio", back_populates="transactions")
    
class PortfolioSnapshot(Base):
    __tablename__ = 'portfolio_snapshots'

    id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    total_value = Column(Numeric(14, 2), nullable=False)
    date = Column(DateTime, default=datetime.now)

    portfolio = relationship("Portfolio", back_populates="snapshots")