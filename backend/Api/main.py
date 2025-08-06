from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import router as auth_router
from routers.StockPrice import router as stock_router
from routers.News import router as news_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(stock_router)
app.include_router(news_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app"}