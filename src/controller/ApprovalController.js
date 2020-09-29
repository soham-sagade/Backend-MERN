const Registration = require('../models/Registeration');
const jwt = require('jsonwebtoken');

module.exports = {

    approval(req,res)
    {
        jwt.verify(req.token,'secret',async(err,authData) => {
            if(err)
                res.sendStatus(401);
            else
            {
                try {
                    const { registrationid } = req.params;
            
                    const registration = await Registration.findById(registrationid);

                    if(registration)
                    {
                        registration.approved = true;
                
                        await registration.save();
                
                        res.json(registration);

                    }
            
                    
                } catch (error) {
                    return res.status(400).json(error);       
                }

            }
        })
        
    }

}