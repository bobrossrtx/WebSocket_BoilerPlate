// Make the WebSocket
const express = require('express');
const appSocket = express();
const server = require('http').createServer(appSocket);
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server: server,
});

const PORT = process.env.PORT || 8080

// Connect to the WebSocket
const connectToWebSocket = () => {
    console.log("Starting WebSocket");
    

    wss.addListener('connection', function connection(ws) {
        //Set isAlive to true on WebSocket
        ws.isAlive = true;
        
        // Logs on server user connection
        console.log("Someone has connected to this socket.");

        // Log message from client to the server
        ws.on("message", function incoming(message) {
            console.log("Data: ", message);

            if (message === "kill server") {
                console.log("Server ended");
                ws.terminate();
                return;
            };

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                };
                // Else, do nothing
            });
        });
    });

    // Close websocket
    wss.on("close", function close() {
        console.log("WebSocket closed")
    });
};

// Make connection
connectToWebSocket();

// Web page
app.get("/", ( _ , res) => {
    res.send("Hello World!");
});

// LIsten on PORT
server.listen(PORT, () => {
    console.log(`WebSocket LIVE on Port ${PORT}`);
})
