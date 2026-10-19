# 📱 TEMPO — AI-Powered Daily Rhythm & Task Management

> **Simplon Fil Rouge Capstone Project • October 2026**  
> *Redefining Daily Productivity with Context-Aware AI*

[![React Native](https://img.shields.io/badge/React_Native-Expo-black?logo=react)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite_Prisma-003B57?logo=prisma)](https://prisma.io/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_3.8_Flash-8E75B2?logo=google)](https://deepmind.google/technologies/gemini/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Overview
**Tempo** is a modern full-stack mobile application that bridges the gap between natural human thoughts and structured task execution. Instead of filling out tedious forms, users can talk naturally in their own language (including Moroccan Darija) to an intelligent assistant powered by **Google Gemini 3.8 Flash**, which extracts task metadata automatically using **Function Calling** and commits it directly to an **SQLite** database via **Prisma ORM**.

---

## 🏗️ System Architecture
Tempo is designed around a clean, decoupled 3-tier architecture:

* **Client Tier (Mobile):** React Native, Expo Router (File-based navigation), Context API (`TaskContext`, `AuthContext`), and AsyncStorage.
* **Application Tier (Backend):** Node.js REST API with Express.js, TypeScript, and stateless JWT Authentication Middleware.
* **Data & AI Tier:** SQLite database managed by Prisma ORM, and Google Gemini Generative AI SDK with Schema Function Calling.

---

## 🚀 Key Features
* 🔐 **Secure Authentication:** User registration, password salting and hashing using `bcrypt`, and stateless JWT Bearer token sessions.
* 📋 **Dynamic Day Flow:** Real-time progress bar recalculating completion percentage live as tasks are marked.
* 🤖 **Smart AI Assistant:** Conversational planning with Google Gemini 3.8, capable of automatically extracting task titles, scheduled times, categories, and priority levels.
* 💾 **Type-Safe Data Persistence:** Relational data models (`User` and `Task`) with Prisma ORM and SQLite.

---

## 📁 Repository Structure
```text
Pr_tempo/
├── mobile/                  # React Native & Expo Mobile Application
│   └── src/
│       ├── app/             # Expo Router Screens (Home, Login, Register, Add Task, Chat)
│       └── context/         # Global State Providers (AuthContext, TaskContext)
│
├── backend/                 # Node.js Express REST API
│   ├── prisma/              # Database Schema & Migrations (schema.prisma, SQLite)
│   └── src/
│       ├── server/          # Server Entry Point (index.ts)
│       ├── routes/          # REST Endpoints (auth, tasks, chat, health)
│       ├── controllers/     # Business Logic & CRUD Handlers
│       ├── middleware/      # JWT Security & Auth Interceptor
│       └── ai/              # Google Gemini AI Service & Function Calling Tool
```

---

## 🛠️ Quick Start Guide

### 1. Prerequisites
* Node.js (v18+)
* npm

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```
*Backend runs on `http://localhost:3000`*

### 3. Mobile Setup
```bash
cd ../mobile
npm install
npm start
```
*Scan the QR code with Expo Go on your physical device or run on an emulator.*

---

## 👨‍💻 Author
**Housame Essafy**  
Full-Stack Mobile Developer • Simplon Academy
