# Amka Youth Backend (Django + DRF + JWT)

## Quickstart (local, SQLite)
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

### Endpoints
- `POST /api/auth/register/` – body: first_name, last_name, email, phone, region, age, gender, interests, password
- `POST /api/auth/jwt/create/` – body: **email** (or username) & password → returns access/refresh tokens
- `POST /api/auth/jwt/refresh/`
- `GET/PATCH /api/auth/me/` – your profile

### Notes
- Custom `User` extends `AbstractUser` with profile fields and unique email.
- Login accepts **email or username**.
- CORS defaults to `http://localhost:5173` (Vite). Configure via `.env`.
