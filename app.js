const express = require("express");
const accessTokenSecret = 'youraccesstokensecret';
// const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000;
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const cors = require('cors')

const authRoutes = require("./routes/auth");

const coilRoutes = require("./routes/coil");

const slittedCoilRoutes = require("./routes/slittedCoil");

const companyRoutes = require("./routes/company");

const shiftRoutes = require("./routes/shift");

const thicknessRoutes = require("./routes/thickness");

const userRoutes = require("./routes/user");

// if (NODE_ENV !== 'production') {
//     app.use(cors())
//  }

const app = express();


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; //authorization header has a value in the format of Bearer [JWT_TOKEN]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// app.use(bodyParser);
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); //And so on.     // add above all middlewares
app.use(cors());



app.use('/coils', authenticateJWT, coilRoutes);

app.use('/slits', authenticateJWT, slittedCoilRoutes);

app.use('/companies', authenticateJWT, companyRoutes);

app.use('/shifts', authenticateJWT, shiftRoutes);

app.use('/thicknesses', authenticateJWT, thicknessRoutes);

app.use('/users', authenticateJWT, userRoutes);

app.use('/login', authRoutes);

app.get('/', (req, res, next) => {
    res.send("<h1>VM BE App</h1")
});

app.listen(PORT,() => {
    console.log("portNo", PORT);
})