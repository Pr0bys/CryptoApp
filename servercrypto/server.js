const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/userRoutes'))

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json(), urlencodedParser);

const dbURI = process.env.DBURL;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => {
    app.listen(PORT, () => console.log("Server is live"))
})