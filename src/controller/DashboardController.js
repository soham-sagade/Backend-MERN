const RaceEvents = require('../models/RaceEvents');
const jwt = require('jsonwebtoken');

module.exports = {
 
 getAllEvents(req,res)
 {

    jwt.verify(req.token,'secret',async(err,authData) => {
        if(err)
        {
            res.sendStatus(401);
        }
        else
        {
            const events = await RaceEvents.find({});

            if(events)
            {
                return res.json({authData,events});
            }

            else
            {
                return res.status(400).json({
                    message: "We do not have any events yet!"
                })
            }    
        }
    })
         

 },

  getEventByCategory(req,res)
 {
    jwt.verify(req.token,'secret',async(err,authData) => {
        if(err)
        {
            return res.sendStatus(401);
        }
        else
        {
            const { sport } = req.params;

            const query =  { sport }  || {};
   
            const events = await RaceEvents.find(query);
   
            if(!events)
            {
                return res.status(400).json({
                    message: "We do not have any events in the selected category!"
                })
            }
   
            else
            {
                return res.json({authData,events});
            }
        }

    })

 },

  getEventsByUserId(req,res){

        jwt.verify(req.token,'secret',async(err,authData) => {
            if(err)
            {
                res.sendStatus(401);
            }
            else
            {
                const {user} = req.headers;
                try {
                    const events = await RaceEvents.find({user: authData.user._id});
                    console.log("hi there");
                    if(events)
                    {
                        return res.json({authData,events});
                    }
        
                } catch (error) {
                    return res.status(200).json({
                        message: "Such an Empty Here!"
                    })
                }
        
            }
        })
       
 }
}