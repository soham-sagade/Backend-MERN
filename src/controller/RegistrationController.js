const Registration = require('../models/Registeration');
const jwt = require("jsonwebtoken");

module.exports = {
    create(req,res)
    {
        jwt.verify(req.token,'secret',async(err,authData) => {
            if (err) {
                res.sendStatus(403);
            } 
            else 
            {
                const userid = authData.user._id;
                console.log(userid);
                const { eventid } = req.params;


                const registration = await Registration.create({
                user: userid,
                event: eventid,
                })
                await registration
                .populate('user','-password')
                .populate('event')
                .execPopulate();

                registration.owner = registration.event.user;
                registration.eventTitle = registration.event.title;
                registration.eventPrice = registration.event.price;
                registration.eventDate = registration.event.date;
                registration.userEmail = registration.user.email;
                registration.save();

                const ownerSocket = req.connectUsers[registration.event.user]




                if(ownerSocket) 
                {
                    req.io.to(ownerSocket).emit('registration_request',registration)
                }

                 return res.json(registration);
            }
        })



        
    },


    async getRegistration(req,res)
    {
        const { registrationid } = req.params;
        try {
                const registration = await Registration.findById(registrationid);
                await registration
                .populate('user')
                .populate('event')
                .execPopulate();

            return res.json(registration);
            } catch (error) {
                return res.status(400).json({
                    message: 'Registration not found!'
                })
        }
    },


    async MyRegistrations(req,res)
    {
        jwt.verify(req.token,'secret',async(err,authData) =>{
            if(err)
                res.sendStatus(401);
            else
            {
                try {
                    const registrationArr = await Registration.find({"owner": authData.user._id })
                    if(registrationArr)
                        res.json(registrationArr)
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }






}