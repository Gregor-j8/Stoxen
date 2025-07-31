from fastapi import APIRouter, HTTPException, Query
import yfinance as yf

router = APIRouter(
    prefix="/stock",
    tags=["Stock"]
)

@router.get("/{ticker}")
def get_stock_data(ticker: str, start: str = Query("2020-01-01")):
    try:
        data = yf.download(ticker, start=start)
        if data.empty:
            raise HTTPException(status_code=404, detail="No data found for ticker.")
        return data["Close"].dropna().to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
