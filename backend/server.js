const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})


const userRouter = require('./routes/users.routes')
app.use('/users',userRouter);

const prodRouter = require('./routes/product.routes')
app.use('/products',prodRouter);




app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
