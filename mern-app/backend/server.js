const express = require("express");
const cors = require('cors');
const connectToDB = require("./db/db.js");
const postRoutes = require('./routes/postRoutes.js');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/posts', postRoutes);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send("404 - Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

// Start server
const server = app.listen(PORT, async () => {
    try {
        await connectToDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('uncaughtException', err => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});




