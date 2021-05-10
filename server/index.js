require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// set up express

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Mt.Moo")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/users", require("./routes/users"));


