const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

const formRoute = require("./route/Path");
app.use("/api/v1/users", formRoute)

const dbConnect = require("./config/DataBase");
dbConnect();

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
  });