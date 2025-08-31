# Python base
FROM python:3.12-slim

# system deps
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# workdir
WORKDIR /app

# install deps first (better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# copy project
COPY . .

# Environment
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Railway sets PORT; default to 8000 locally
ENV PORT=8000

# entrypoint handles migrate + start
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000
CMD ["/entrypoint.sh"]
