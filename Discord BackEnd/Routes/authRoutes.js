const express = require('express');
const router = express.Router();
const authControllers = require("../Controlers/auth/authControllers");

router.get("/register", authControllers.controllers.postRegister);

 router.post("/login",(req,res) => {
     res.send("login route");
 });

 module.exports = router;