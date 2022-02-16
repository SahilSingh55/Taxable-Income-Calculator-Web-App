const mongoose = require("mongoose");
const connectionOptions = { useUnifiedTopology: true, useNewUrlParser: true };
const DB = process.env.MONGO_URL;

mongoose.connect(DB, connectionOptions)
    .then(() => console.log(`Connected successfully`))
    .catch((err) => console.error(err));