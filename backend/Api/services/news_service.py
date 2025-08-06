from stocknews import StockNews
import json
from utils.redis_client import get_redis_client

def add_news_to_db(symbol: str):
    r = get_redis_client()
    key = f"news_feed:{symbol.upper()}"

    if not r.exists(key):
        sn = StockNews(symbol, save_news=False)
        df_news = sn.read_rss()
        r.set(key, df_news.to_json(orient='records'), ex=3600)
        return df_news.to_dict(orient='records')
    else:
        cached = r.get(key)
        return json.loads(cached)
    
def news_articles(feed_data):
    results = []
    for article in feed_data:
        newsdata = {
            "guid": article.get("guid"),
            "stock": article.get("stock", "No Stock"),
            "title": article.get("title", "No Title"),
            "summary": article.get("summary", "No summary available."),
            "published": article.get("published"),
            "p_date": article.get("p_date"),
            "sentiment_summary": article.get("sentiment_summary"),
            "sentiment_title": article.get("sentiment_title")
        }
        results.append(newsdata)
    return results
