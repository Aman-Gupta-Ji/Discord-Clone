const User = require("../../Modles/user");
const bcrypt= require("bcryptjs");
const jvt = require("jsonwebtoken");

const postRegister = async (req,res) => {
    try {
        const {username, mail, password} = req.body;
        // check if user exists
        const mailExists = await User.exists({mail: mail.toLowerCase()});
        if(mailExists)
            return res.status(409).send("E-mail already in user");
        
        const userExist = await User.exists({username});
        if(userExist)
            return res.status(409).send("User Name already exists");
        
        const encryptedPassword = await bcrypt.hash(password,11);
        // create user document and save in database
        const user = await new User({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword,
        });
        user.save();

        // create JWT token
        const token = 'JWT TOKEN';
        res.status(201).json({
            userDetails: {
                mail: mail.toLowerCase(),
                password: encryptedPassword
            }
        });
    } catch(err) {
        console.log(err)
        return res.status(500).send("Error occured. Please try again");
    }
};
 
module.exports = postRegister;