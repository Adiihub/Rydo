const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const port = process.env.PORT || 3000;

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});


const server = http.createServer(app);

// Start server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
