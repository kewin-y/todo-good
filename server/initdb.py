import os
import psycopg
from dotenv import load_dotenv

def create_tables():
    load_dotenv()
    with psycopg.connect(os.getenv("DATABASE_URL")) as conn:
        with conn.cursor() as cur:
            cur.execute("DROP TABLE IF EXISTS todos")
            cur.execute("""
                CREATE TABLE todos (
                    id SERIAL PRIMARY KEY,
                    summary VARCHAR(255),
                    completed boolean
                );
            """)
            conn.commit()

if __name__ == "__main__":
    create_tables()

