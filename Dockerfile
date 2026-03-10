FROM python:3.7-slim

WORKDIR /app

# Install only runtime libs for OpenCV & ML
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY req.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r req.txt

# Copy your full project
COPY . .

EXPOSE 5000

CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "app:app"]
