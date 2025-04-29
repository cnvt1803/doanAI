pip install -r requirements.txt

docker-compose build

docker-compose up -d

python -m app.models.base

uvicorn app.main:app --reload

backend-db-1 psql -U user_DADN -d db_DADN
