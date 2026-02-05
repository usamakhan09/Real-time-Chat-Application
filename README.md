# Dialogflow ES WebSocket Chatbot

## Overview
This project is a real-time chatbot application built using **Node.js**, **Express**, **Socket.IO**, and **Dialogflow ES**.  
It demonstrates a full end-to-end conversational flow where a web-based frontend communicates with a backend WebSocket server, which in turn interacts with Dialogflow to generate intelligent responses.

The solution supports multiple concurrent users, with each user maintaining an isolated Dialogflow session.

---

## Architecture Overview

Frontend (HTML + JavaScript)
↓ (WebSocket via Socket.IO)
Node.js WebSocket Server (Express + Socket.IO)
↓ (Dialogflow SDK)
Dialogflow ES Agent

---

## Key Technologies Used
- Node.js
- Express.js
- Socket.IO (WebSockets)
- Dialogflow ES (Google Cloud)
- HTML / CSS / JavaScript

---

## Project Structure

- index.js # Node.js server (WebSocket + Dialogflow logic)
- index.html # Frontend chat UI
- google-credentials.json # Dialogflow service account key (not committed)
- package.json
- README.md


---

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or later recommended)
- A Google Cloud project with Dialogflow ES enabled
- Dialogflow Service Account JSON key

---

### 2. Install Dependencies

```bash
npm install
```
### 3. Configure Dialogflow Credentials
- Create a service account, give it the Dialogflow API Client role, and download the JSON Key and rename it as **google-credentials.json** add in root directory.
- Update the Dialogflow project ID in index.js
```bash
const PROJECT_ID = 'your-dialogflow-project-id';
```
### 4. Run the Server

```bash
node index.js
```
- Server will start at: http://localhost:3000

### 5. Run the Frontend
- Open a browser and navigate to: http://localhost:3000 .





