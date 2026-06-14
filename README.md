# 🚗⚡ ChargePilot AI

## AI-Powered EV Fleet Intelligence & Optimization Platform

ChargePilot AI is a full-stack AI-powered Electric Vehicle (EV) fleet management platform designed to help fleet operators monitor vehicles, analyze trips, optimize charging decisions, and improve operational efficiency.

The platform combines intelligent analytics, simulation, AI recommendations, and fleet monitoring to transform EV management from reactive decision-making into predictive intelligence.

---

## 📌 Problem Statement

Electric vehicle fleets face challenges such as:

- Battery range uncertainty
- Inefficient charging decisions
- Trip failures due to poor planning
- Lack of fleet health monitoring
- High operational costs

Traditional fleet systems provide tracking but lack intelligent prediction and decision support.

---

## 💡 Solution

ChargePilot AI provides an intelligent EV fleet platform that helps operators:

- Monitor fleet performance
- Predict trip feasibility
- Analyze battery usage
- Simulate different trip scenarios
- Optimize charging requirements
- Identify operational risks
- Receive AI-powered recommendations

---

## ✨ Features

### 📊 Fleet Dashboard
- Total vehicle tracking
- Trip analytics
- Average battery monitoring
- Fleet utilization insights
- Operational overview

### 🚘 Vehicle Management
- Add vehicles
- View fleet vehicles
- Track vehicle details
- Manage fleet data

### 🛣️ AI Trip Analysis
Analyze EV trips using:
- Battery level
- Distance
- Load
- Temperature
- Traffic conditions

Provides:
- Predicted driving range
- Trip success probability
- Risk evaluation
- Energy estimation

### 🎮 What-If Trip Simulator
Test different scenarios:
- Battery percentage
- Distance
- Vehicle load
- Temperature
- Traffic level

Generates:
- Expected range
- Trip success
- Risk score
- Charging requirement

### 🔋 Smart Charging Engine
Provides:
- Available battery energy
- Estimated energy requirement
- Recommended charging percentage
- Trip feasibility

### ❤️ Fleet Health Monitoring
Tracks:
- Vehicle condition
- Battery status
- Fleet performance

### 🛠️ Predictive Maintenance
Provides maintenance insights to reduce downtime and improve reliability.

### 🤖 AI Recommendation System
Generates intelligent suggestions based on:
- Fleet analytics
- Trip conditions
- Battery performance
- Operational data

---

## 🧠 AI Technologies Used

### AI Components
- AI-based trip analysis
- Rule-based recommendation engine
- EV range estimation logic
- Risk assessment system
- Energy optimization calculations

### AI Tools
- Wolfram Alpha API integration
- AI-assisted development tools

---

## 🏗️ System Architecture

```txt
User
  |
  v
React Frontend
  |
  v
FastAPI Backend
  |
  +-------------------------+
  | Vehicles | Trips | Analytics |
  +-------------------------+
  |
  v
Simulator / Optimization Engine
  |
  v
AI Recommendation Layer
  |
  v
Dashboard Insights
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Python
- FastAPI
- REST API

### Database
- SQLite / JSON-based storage

### Deployment
- Docker
- Containerized deployment

### APIs
- Wolfram Alpha API

---

## 📂 Project Structure

```txt
ChargePilot-AI
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   └── services
│
├── backend
│   ├── app
│   │   ├── routes
│   │   ├── services
│   │   ├── models
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── Dockerfile
├── README.md
└── .gitignore
```

---

## 🚀 Installation Guide

### Clone Repository
```bash
git clone https://github.com/Riya3024/ChargePilot-AI.git
cd ChargePilot-AI
```

### Run Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend runs on:
```txt
http://localhost:8000
```

### Run Frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```txt
http://localhost:5173
```

---

## 🐳 Docker Deployment

ChargePilot AI is containerized using Docker for easy deployment and scalability.

### Build Docker Image
```bash
docker build -t chargepilot-ai .
```

### Run Application
```bash
docker run -p 8000:8000 chargepilot-ai
```

Application:
```txt
http://localhost:8000
```

---

## ⚙️ Configuration

ChargePilot AI uses environment variables to configure API communication between the frontend and backend.

The project supports both local development and production deployment environments.

### Local Development Configuration

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

### Production Configuration

Create `frontend/.env.production`:

```env
VITE_API_URL=https://chargepilot-ai.onrender.com
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](image.png)

### Vehicle Management
![Vehicle Management](image-1.png)

### Trip Analyzer
![Trip Analyzer](image-2.png)

### Results
![Results](image-3.png)

### Simulator
![Simulator](image-4.png)

### Charging Engine
![Charging Engine](image-5.png)

### Fleet Health
![Fleet Health](image-6.png)

### Maintenance
![Maintenance](image-7.png)

---

## 🔮 Future Improvements

- Real-time GPS tracking
- Live charging station integration
- ML-based battery degradation prediction
- Mobile application
- LLM-powered fleet assistant
- Cloud fleet management
- Advanced driver analytics

---

## 🎯 Impact

ChargePilot AI helps EV fleet operators:

- Reduce charging downtime
- Improve route planning
- Increase fleet efficiency
- Prevent operational failures
- Make smarter decisions using AI insights

---

## 👨‍💻 Team

Built for:

- **Hackathon:** OSC AI Build 1.0
- **Project:** ChargePilot AI

---

## 📄 License

This project is developed for educational and innovation purposes.


