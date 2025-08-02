from fastapi import APIRouter, HTTPException, Query
import yfinance as yf

router = APIRouter(
    prefix="/stock",
    tags=["Stock"]
)

@router.get("/{ticker}")
def get_stock_data(ticker: str, start: str = Query("2022-01-01")):
    try:
        ticker_obj = yf.Ticker(ticker)
        hist = ticker_obj.history(start=start)
        
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No data found for ticker {ticker}")
        close_prices = hist["Close"].dropna()
        close_dict = {date.strftime("%Y-%m-%d"): price for date, price in close_prices.items()}

        return close_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))