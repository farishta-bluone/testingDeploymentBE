const express = require("express");

const http = require("http")

// const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

// const PORT = process.env.PORT || 5050;
const bodyParser = require("body-parser");

const cors = require('cors')

const listRoutes = require("./routes/list");

const addRoutes = require("./routes/add");

// if (NODE_ENV !== 'production') {
//     app.use(cors())
//  }

const app = express();

app.set('port',5555);

// app.use(bodyParser);
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); //And so on.     // add above all middlewares
app.use(cors());


app.use('/list', listRoutes);

app.use('/add', addRoutes);

app.get('/', (req, res, next) => {
    res.send("<h1>VM BE App</h1")
});

http.createServer(app).listen(app.get('port'), () => {
    console.log("portNo", app.get('port'));
});

// app.listen(,() => {
//     console.log("portNo", PORT);
// })