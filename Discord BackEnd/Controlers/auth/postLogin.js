const User = require("../../Modles/user");
const bcrypt= require("bcryptjs");
const jvt = require("jsonwebtoken");

const postLogin = async (req,res) => {
    try {
        const {mail, password} = req.body;
        // check if user exists
        const user = await User.findOne({mail: mail.toLowerCase()});
        if(!user)
            return res.status(409).send("E-mail not found");

        const encryptedPassword = await bcrypt.compare(password,user.password);
        if(!encryptedPassword)
            return res.status(409).send("Password Not matching! Incorrect Password");
        res.status(200).json(user);
        
    } catch(err) {
        console.log(err)
        return res.status(500).send("Error occured. Please try again");
    }
};
 
module.exports = postLogin;