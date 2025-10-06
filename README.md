# Enigmatry Comments Assignment

This project is a full-stack comments application, featuring a .NET backend API and an Angular frontend. It demonstrates basic CRUD operations for comments and is intended as a technical assignment.

## Project Structure

- **Enigmatry.Comments.Api/** – .NET 8 Web API backend (C#)
- **enigmatry-comments-app/** – Angular frontend application (TypeScript)

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PavleG/enigmatry-comments-assignment.git
cd enigmatry-comments-assignment
```

### 2. Install Dependencies

#### Backend

```bash
cd Enigmatry.Comments.Api
# No dependencies to install manually; .NET will restore them on build/run
cd ..
```

#### Frontend

```bash
cd enigmatry-comments-app
npm install
cd ..
```

### 3. Running the Applications

#### Option 1: Start Both (Recommended)

A helper script `start-all.sh` is provided to run both backend and frontend in parallel:

```bash
./start-all.sh
```
Make sure to have script execution rights.

#### Option 2: Start Individually

**Backend:**
```bash
cd Enigmatry.Comments.Api
dotnet run
```

**Frontend:**
```bash
cd enigmatry-comments-app
npm start
```

## Usage

- The backend API will be available at `http://localhost:5018` (or as configured).
- The Angular frontend will be available at `http://localhost:4200`.

## Notes

- The backend uses an in-memory database and seeds several example comments on startup.
- For development, ensure both backend and frontend are running.
- Adjust ports in the source if you have conflicts or custom requirements.