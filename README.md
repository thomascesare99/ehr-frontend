# 🏥 EHR Frontend (Electronic Health Record)

A modern, responsive Electronic Health Record (EHR) web application built with **Angular 18+** and **Angular Material**. This project simulates a real-world healthcare system for managing patients, hospital admissions, and clinical history.

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Angular](https://img.shields.io/badge/Angular-18+-dd0031?logo=angular)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)

---

## 🩺 About the Project
This application serves as the user interface for a hospital management system. It is designed to be **clean, fast, and accessible**. 

Currently, the application runs in **Mock Mode**, using in-memory services to simulate data persistence. It is architected to be easily connected to a real backend (NestJS/.NET) by simply replacing the service logic.

---

## ✨ Key Features

### 👤 Patient Management
- **Directory:** View a searchable, sortable list of all patients using robust Data Tables.
- **Profiles:** Detailed patient cards showing demographic data (Fiscal Code, DOB, Contact).
- **CRUD Operations:** - **Create:** Add new patients with validation-rich Reactive Forms.
  - **Edit:** "Upsert" logic allowing seamless updates to existing records.
  - **Validation:** Real-time feedback for required fields and data formats.

### 🏥 Hospitalization & History
- **Medical Timeline:** Track patient admissions and discharges.
- **Status Tracking:** Visual "Traffic Light" system for **Active** (Green) vs **Discharged** (Gray) status.
- **Admissions:** Streamlined modal dialogs (`MatDialog`) for quick patient intake.
- **Ward Management:** Assign patients to specific departments (Surgery, Cardiology, etc.).

---

## 🛠 Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | [Angular 18+](https://angular.dev/) | Standalone Components, Signals, Routing |
| **UI Library** | [Angular Material](https://material.angular.io/) | Tables, Cards, Dialogs, Forms, Chips |
| **Styling** | SCSS | Flexbox layouts, Custom Theming, Responsive Design |
| **Forms** | Reactive Forms | Complex validation, Custom validators |
| **State/Data** | RxJS | Observables for asynchronous data handling |

---

## 🏗 Project Architecture

The project follows a **Feature-Based Architecture** to ensure scalability and separation of concerns.

```text
src/app
├── core/                 # Singleton services, guards, interceptors
├── features/             # Business logic modules
│   ├── patients/         # Patient CRUD logic
│   │   ├── pages/        # List, Detail, Create components
│   │   ├── services/     # Patient data fetching
│   │   └── models/       # TypeScript Interfaces
│   │
│   └── hospitalizations/ # Admission logic
│       ├── pages/        # History list
│       └── components/   # Dialogs (e.g., Admission Form)
│
└── shared/               # Reusable UI components & pipes
