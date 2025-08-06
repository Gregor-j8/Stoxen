from fastapi import APIRouter, HTTPException
from datetime import datetime
from dateutil.relativedelta import relativedelta
import yfinance as yf
import pandas as pd
from prophet import Prophet
import numpy as np


router = APIRouter(
    prefix="/stock",
    tags=["Stock"]
)

five_years_ago = datetime.today() - relativedelta(years=5)
today = datetime.today()

@router.get("/{ticker}")
def get_stock_data(ticker: str):
    try:
        ticker_obj = yf.Ticker(ticker)
        hist = ticker_obj.history(start=five_years_ago)

        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No data found for ticker {ticker}")
        close_prices = hist["Close"].dropna()
        close_dict = [{"date": date.strftime("%Y-%m-%d"), "price": round(price, 2)} for date, price in close_prices.items()]

        return close_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/future/{ticker}")
def get_stock_forecast(ticker):
    df = yf.download(ticker)
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    print("Columns after flattening:", df.columns)

    if 'Close' not in df.columns:
        raise ValueError(f"'Close' column missing in data for ticker {ticker}")

    df = df.reset_index()

    df = df.rename(columns={"Date": "ds", "Close": "y"})

    if 'y' not in df.columns:
        raise ValueError("'y' column missing after rename")

    df["ds"] = pd.to_datetime(df["ds"])
    df["y"] = pd.to_numeric(df["y"], errors='coerce')

    df = df.dropna(subset=['ds', 'y'])

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(freq='ME', periods=36)
    forecast = model.predict(future)

    forecast['ds'] = pd.to_datetime(forecast['ds'])
    forecast.set_index('ds', inplace=True)

    result = forecast[['yhat']].tail(36)
    forecast_list = [{"date": date.strftime("%Y-%m-%d"), "predicted_price": round(price, 2)} for date, price in result["yhat"].items()]

    return forecast_list

@router.get("/asset/correlation")
def get_stock_correlation():
    try:
        tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']
        print("getting data")
        data = yf.download(tickers, start=five_years_ago, end=today)["Close"]
        print(data)

        if data.empty:
            raise ValueError("Downloaded data is empty. Check tickers or network.")
        returns = data.pct_change().dropna()

        correlation = returns.corr()

        return correlation.to_dict()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Correlation computation failed: {str(e)}")