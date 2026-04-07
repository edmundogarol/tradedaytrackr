# tradedaytrackr

Repository: `tradedaytrackr`

## 🌐 Live Application

Website: `www.tradedaytrackr.com`

## TradeDayTrackR - Trade Journal App

![TradeDayTrackR - Trade Journal App ](https://edmundo-dev-assets.s3.us-west-2.amazonaws.com/screenshots/tradedaytrackr-webapp)

# 🚀 TradeDayTrackR

A full-stack trading journal and analytics platform designed to help traders track performance, enforce discipline, and optimize their edge over time.

---

## 🧠 Overview

TradeDayTrackR is a production-ready SaaS application built to simulate real prop-firm trading environments. It enables users to:

- Track trades and journal entries
- Manage multiple trading accounts
- Enforce rule-based trading constraints
- Analyze performance over time

The system is designed with **scalability, reliability, and real-world usage** in mind.

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- React (TypeScript)
- Custom Hooks architecture
- Context API (state management)
- Axios (API layer)
- Material UI + custom components

### 🔧 Backend

- Django + Django REST Framework
- PostgreSQL
- Session-based authentication
- Celery (async tasks, email handling)

### ☁️ Infrastructure

- AWS Elastic Beanstalk (deployment)
- AWS RDS (database)
- AWS SES (email service)
- Nginx (via EB)
- Environment-based configuration

---

## 🏗️ Architecture Overview

The application follows a **layered architecture**:

```text
Frontend (React)
    ↓
API Layer (Axios hooks)
    ↓
Django REST API
    ↓
Service Layer (business logic)
    ↓
Database (PostgreSQL)
```

### Key design principles:

- **Separation of concerns**
  - Views → request handling
  - Services → business logic
  - Models → data structure

- **Custom hook abstraction** for API calls
- **Deterministic backend validation**
- **Environment-driven configuration (secure by default)**

---

## ✨ Key Features

### 📊 Trading Journal

- Log trades with structured data
- Attach tags and notes
- Track performance metrics

---

### 🏦 Account Templates System

- Create reusable templates for prop firm accounts
- Supports:
  - Evaluation accounts
  - Funded accounts

- Conditional rule enforcement:
  - Profit targets
  - Drawdown limits
  - Minimum trading days
  - Consistency rules

---

### 🎮 Demo Mode (Unique Feature)

- Fully simulated trading environment
- Automatically resets on login
- Seeds predefined account templates
- Allows users to explore the platform risk-free

---

### 🧩 Smart Validation System

- Dynamic validation based on account type
- Backend-driven business rules
- Prevents invalid configurations

---

### 🖼️ Optimized Media Handling

- Image uploads are automatically:
  - Resized
  - Compressed
  - Standardized

- Supports both:
  - Predefined icons
  - Custom user uploads

---

### 🔐 Authentication System

- Secure session-based authentication
- Login/logout handling
- IP tracking for sessions

---

### 📧 Email System

- AWS SES integration
- Production-ready email delivery
- Supports transactional emails (e.g. auth flows)

---

## 🧠 Notable Engineering Decisions

- **Backend-first validation**
  Ensures data integrity regardless of frontend behavior

- **Snake_case ↔ camelCase mapping layer**
  Clean separation between backend and frontend conventions

- **Service layer abstraction**
  Keeps business logic reusable and testable

- **Serializable error handling**
  Prevents frontend state issues (Redux-safe)

---

## 📈 Future Improvements

- Advanced analytics dashboard
- Trade performance visualizations
- Multi-account aggregation
- Real-time data integrations

---

## 👤 Author

Built by Edmundo Garol

---

## 📌 Notes

This repository is private for security reasons.
Access can be granted upon request.

---
