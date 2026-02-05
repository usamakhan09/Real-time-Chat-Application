const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- DIALOGFLOW CONFIGURATION ---
// project ID
const PROJECT_ID = 'myfirstagent-utmf'; 
const SESSION_ID = uuid.v4(); // Unique ID for the chat session
const LANGUAGE_CODE = 'en-US';

// Point this to your downloaded JSON key file
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'google-credentials.json');


// --- SERVER LOGIC ---


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, SESSION_ID);

    // Listen for "chat message" from the frontend
    socket.on('chat message', async (msg) => {
        console.log('User said: ' + msg);

        // 1. Prepare the request for Dialogflow
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: msg,
                    languageCode: LANGUAGE_CODE,
                },
            },
        };

        try {
            // 2. Send the message to Dialogflow
            const responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;

            // 3. Extract the bot's reply
            const botReply = result.fulfillmentText;
            console.log('Bot replied: ' + botReply);

            // 4. Send the reply back to the user via WebSockets
            socket.emit('bot response', botReply);

        } catch (error) {
            console.error('Dialogflow Error:', error);
            socket.emit('bot response', 'Oops! I had a glitch in my system.');
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});