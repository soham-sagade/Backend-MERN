

function verifyToken(req,res,next)
{
    const bearertoken =  req.header('user');
    if(typeof bearertoken != 'undefined')
    {   
        req.token = bearertoken;
        next();
    }
    else
    {
        res.sendStatus(403);
    }
}

module.exports = verifyToken;
