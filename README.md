# Amka Youth — Fullstack Starter (Django + React + Tailwind)

A clean, fast, and scalable starter for your youth organization. It asks visitors to **log in / sign up**, then presents a **registration form** collecting:
- First & last name
- Email address
- Phone number
- Region (dropdown): Nairobi, Coastal, Western, North Eastern, Nyanza, Eastern, Rift Valley
- Age
- Gender
- Interests

## Run backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

## Run frontend
```bash
cd frontend
npm install
npm run dev
# UI at http://localhost:5173
```

> The frontend defaults to `VITE_API_URL=http://localhost:8000/api`. To change it, create `.env` at `frontend` with:
```
VITE_API_URL=http://your-backend/api
```

### Production notes
- Switch DB to Postgres by setting `DATABASE_URL` in `backend/.env`.
- Set `DEBUG=0`, real `SECRET_KEY`, and tighten `ALLOWED_HOSTS` + `CORS_ALLOWED_ORIGINS`.
# Amka-youth-web-app
