const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {

    async store(req,res)
    {

        try {
            const {email, password} = req.body;
            if(!email || !password || email === '' || password === '')
            {
                res.status(200).json({
                    message: "Required field missing!"
                })
            }
            
            
            const user = await User.findOne({ email });
            if(!user)
            {
                res.status(200).json({
                    message:"User not found! Would like to register instead?"
                })
            }

            if(user && await bcrypt.compare(password, user.password))
            {
                const userResponse ={
                    _id : user._id,
                    email : user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                } 
                return jwt.sign({user:userResponse},'secret',(err,token) => {
                    return res.json({
                        user: token,
                        userid: userResponse._id
                    })
                })
            }

            else{
                return res.status(200).json({
                    message:"Password or Email does not match!"
                })
            }
        } catch (error) {
            throw Error("Something went wrong! Please try again!")
        }
    }



}