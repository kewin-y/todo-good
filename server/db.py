import atexit
import os
from dotenv import load_dotenv
from psycopg_pool import ConnectionPool

load_dotenv()

pool = ConnectionPool(
    conninfo=os.getenv("DATABASE_URL"),
    min_size=4,
    max_size=10,
    open=True,
)

def close_pool():
    pool.close()
    print("Closed Connection Pool")

atexit.register(close_pool)
