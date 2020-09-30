const User = require('../models/User');
const { Mongoose }= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async createUser(req,res)
    {
        console.log(req.body);
        try{
            const {firstname,lastname,password,email} = req.body;

            const existentUser = await User.findOne({email});

            if(!existentUser)
            {
                const hashedPassword = await bcrypt.hash(password,10);
                const user = await User.create({
                    firstname:firstname,
                    lastname:lastname,
                    password:hashedPassword,
                    email:email
                })
                return jwt.sign({user:user},'secret',(err,token) => {
                    return res.json({
                        user: token,
                        userid: user._id
                    })
                })
            }

            return res.status(200).json({
                message:"User already exists! Do you want to login instead?"
            })

           

        }
        catch(error)
        {   
            throw(`Error while registering due to following: ${error}`);
        }
    },

    async getUser(req,res)
    {
        const {userId} = req.params;
        try {
            const user = await User.findById(userId);
            return res.json(user);
        } catch (error) {
            return res.status(400).json(
            {
                message:"Sorry! User not found!"
            })
        }
    }
}