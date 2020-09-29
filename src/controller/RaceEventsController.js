const RaceEvents = require('../models/RaceEvents');
const User = require('../models/User');
const { json } = require('express');
const jwt = require('jsonwebtoken');


module.exports = {
    CreateEvent(req,res)
    {
        jwt.verify(req.token,'secret',async(err,authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const {title,description,price,sport,date} =  req.body;

        const { location } = req.file;
        
        const user = await User.findById(authData.user._id);

        try {
            if(!user)
            {
                return res.status(400).json({message:"User doesn't not exist"});
            }    
        } catch (TypeError) {
            console.log("mistake!");
        }
        


        const RaceEvent = await RaceEvents.create({
            title,
            description,
            price,
            sport,
            user:authData.user._id,
            thumbnail: location,
            date
        })

        return res.status(200).json({
            message: "Event created Successfully!"
        });
            }
    })
        
    },

    deleteEvent(req,res)
    {
        jwt.verify(req.token,'secret',async(err,authData) => {
            if (err) {
                    res.sendStatus(401);
            } else {
                const { eventid } = req.params;  
                console.log(eventid);      
                try {
                    await RaceEvents.findByIdAndDelete(eventid);
                    return res.status(200).json({
                        message:"Deleted successfully!"
                    })
                } catch (error) {
                    console.log(error);
                    return res.status(200).json({
                        message:"Couldn't delete the event!"})
                }
            }
        })
        
    }

}