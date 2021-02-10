const express = require("express");

// const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000;
const bodyParser = require("body-parser");

const cors = require('cors')

const coilRoutes = require("./routes/coil");

const slittedCoilRoutes = require("./routes/slittedCoil");

const companyRoutes = require("./routes/company");

const shiftRoutes = require("./routes/shift");

// if (NODE_ENV !== 'production') {
//     app.use(cors())
//  }

const app = express();

app.set('port',5555);

// app.use(bodyParser);
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); //And so on.     // add above all middlewares
app.use(cors());

app.use('/coils', coilRoutes);

app.use('/slitted-coils', slittedCoilRoutes);

app.use('/companies', companyRoutes);

app.use('/shifts', shiftRoutes);

// app.use('/add', addRoutes);

app.get('/', (req, res, next) => {
    res.send("<h1>VM BE App</h1")
});

app.listen(PORT,() => {
    console.log("portNo", PORT);
})