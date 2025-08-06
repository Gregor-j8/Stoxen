from stocknews import StockNews
import json
from utils.redis_client import get_redis_client
import feedparser


def get_news_general():
    r = get_redis_client()
    key = "general_news"
    
    if not r.exists(key):
        rss_url = "https://finance.yahoo.com/news/rssindex"
        feed = feedparser.parse(rss_url)
        print(feed)
        news = []
        for entry in feed.entries[:10]:
            news.append({
                "title": entry.get("title", "No title"),
                "link": entry.get("link", ""),
                "published": entry.get("published", "Unknown date"),
                "summary": entry.get("summary", ""),
                "author": entry.get("author", "Unknown"),
            })
        r.set(key, json.dumps(news), ex=7200)
        return news
    else: 
        cached = r.get(key)
        return json.loads(cached)
    


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
