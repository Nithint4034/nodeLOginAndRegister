const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const userModel = require('./model/model');
const mongoose = require('mongoose');

//Connecting to mongoDB database
mongoose.connect("mongodb+srv://godsownstay:project2022@development.ggvhjk7.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((error)=>{
    console.log("Database not connected", error);
})

//configuring middleware
//This middleware is typically used in Node.js applications built with frameworks like Express.js to handle request data. It allows your application to automatically parse the request body and make it accessible in your route handlers
//By using these middleware functions, you can conveniently access the request body data in your route handlers as req.body.
app.use(bodyParser.json()); //middleware parses the request body if it is in JSON format
app.use(bodyParser.urlencoded({extended:true})); //middleware parses the request body if it is in URL-encoded format

//Route handler
app.get('/', ()=>{
    res.send('Login and Register');
})

app.post("/userRegistration",async(req,res,next) => {
    try {
        const userData = req.data;
        const checkUserEmail = await userModel.find({
            email:userData.email,
        })
    } catch (error) {
        next(error)
    }
});

app.get("/getUser", async (req,res, next) => {

});

app.post("/userLogin", async(req,res,next)=>{

});

app.listen(3000, ()=>{
    console.log("Server listening to the port 3000");
})

// const express = require("express");
// const app = express();
// const bcrypt = require("bcrypt");
// const bodyParser = require("body-parser");
// const userModel = require("./model/model");
// const mongoose = require("mongoose");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //Connecting to mongoDB database
// mongoose
//     .connect(
//         "mongodb+srv://godsownstay:project2022@development.ggvhjk7.mongodb.net/?retryWrites=true&w=majority",
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() => {
//         console.log("Database Connected successfully");
//     })
//     .catch((error) => {
//         console.log("Database not connected", error);
//     });

// //Routes
// app.get("/", function (req, res) {
//     res.send("Jai Shree Ram");
// });

// app.post("/userRegistration", async (req, res, next) => {
//     try {
//         const userData = req.body;

//         const checkUserEmail = await userModel.find({
//             email: userData.email,
//         });

//         if (checkUserEmail.length > 0) {
//             return res.status(409).json({
//                 message:
//                     "user with this email already exist please try with another email",
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const dt = await bcrypt.hash(userData.password, salt);
//         const createUserData = await userModel.create({
//             ...userData,
//             password: dt,
//         });
//         if (!createUserData) {
//             res.status(400).json({
//                 error: true,
//                 message: "Oops Something went wrong",
//             });
//         } else {
//             res.status(200).json({
//                 error: false,
//                 message: "user registration created successfully",
//                 response: createUserData,
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// app.get("/getUsers", async (req, res, next) => {
//     try {
//         const userData = await userModel.find().lean();
//         if (userData) {
//             res.status(200).json({
//                 error: false,
//                 message: "user registration data fetched sucessfully",
//                 response: userData,
//             });
//         } else {
//             res.status(400).json({
//                 error: true,
//                 message: "Data not prasent",
//             });
//         }
//     } catch (error) { }
// });

// app.post("/userLogin", async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         const checkUserExist = await userModel.findOne({ email });
//         if (!checkUserExist) {
//             return res.status(404).json({
//                 message: "user not found please register first",
//             });
//         }

//         const passwordMatch = await bcrypt.compare(
//             password,
//             checkUserExist.password
//         );

//         if (!passwordMatch) {
//             return res.status(401).json({
//                 message: "password is not matching",
//             });
//         }

//         return res.status(200).json({
//             message: "login Successfull",
//         });
//     } catch (error) {
//         console.log(error);
//         return res.send(error);
//     }
// });

// app.listen(3000, function () {
//     console.log("Server is running on port 3000");
// });
