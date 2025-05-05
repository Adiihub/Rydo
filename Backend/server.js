const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const port = process.env.PORT || 3000;
const connectDB = require('./DB/db');  
const userRoutes = require('./routes/user.routes');

connectDB();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/user', userRoutes);



const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
