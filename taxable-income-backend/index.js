const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3030;
const app = express();   
const connectionOptions = { useUnifiedTopology: true, useNewUrlParser: true};


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myTaxableIncomeDB", connectionOptions)
    .then(() => console.log("Connected successfully"))
    .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

const paraSchema = new mongoose.Schema({
    Bas: Number,
    LTA: Number,
    HRA: Number,
    FA: Number,
    Inv: Number,
    Rent: Number, 
    CityType: String,
    Med: Number,
    AppHRA: Number
});

const Para = new mongoose.model("Para", paraSchema);

//Routes
app.post("/login", (req, res)=> {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if(user) {
            if(password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
});

app.post("/register", (req, res)=> {
    const { name, email, password } = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save( err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    }) 
});

app.post("/homepage", (req, res)=> {
    const { Bas, LTA, HRA, FA, Inv, Rent, CityType, Med, AppHRA } = req.body
    const para = new Para({
        Bas,
        LTA,
        HRA,
        FA, 
        Inv, 
        Rent, 
        CityType, 
        Med, 
    })
    para.save( err => {
        if(err) {
            res.send(err)
        } else {
            res.send( { message: "Bas: "+Bas+","+"  LTA: "+LTA+","+"  HRA: "+HRA+","+"  FA: "+FA+","+"\n"+
                                 "Inv: "+Inv+","+"  Rent: "+Rent+","+"  CityType: "+CityType+","+"  Med: "+Med})
        }
    })     
}); 

app.listen(PORT, () => {
    console.log("The server is listening on port " + PORT);
});