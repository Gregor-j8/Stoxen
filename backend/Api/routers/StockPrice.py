from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from dateutil.relativedelta import relativedelta
import yfinance as yf

router = APIRouter(
    prefix="/stock",
    tags=["Stock"]
)

one_year_ago = datetime.today() - relativedelta(years=5)

@router.get("/{ticker}")
def get_stock_data(ticker: str):
    try:
        ticker_obj = yf.Ticker(ticker)
        hist = ticker_obj.history(start=one_year_ago)
        
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No data found for ticker {ticker}")
        close_prices = hist["Close"].dropna()
        close_dict = [{"date": date.strftime("%Y-%m-%d"), "price": round(price, 2)} for date, price in close_prices.items()]

        return close_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))