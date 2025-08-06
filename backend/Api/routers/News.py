from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.news_service import add_news_to_db, news_articles, get_news_general

router = APIRouter(
    prefix="/news",
    tags=["News"]
)

@router.get("/get_news")
def get_news():
    try:
        news = get_news_general()
        return JSONResponse(content={"articles": news})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/get_news/{symbol}")
def get_news_by_symbol(symbol: str):
    try:
        feed_data = add_news_to_db(symbol)
        feed = news_articles(feed_data)

        feed_one = [feed[i] for i in range(len(feed)) if i % 2 == 0]
        feed_two = [feed[i] for i in range(len(feed)) if i % 2 != 0]

        return JSONResponse(content={"feed_one": feed_one, "feed_two": feed_two})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
