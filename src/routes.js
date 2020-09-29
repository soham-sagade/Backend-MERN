const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/VerifyToken');
const uploadtoS3 = require('./config/s3uploads')
const RaceEventsController = require('./controller/RaceEventsController.js');
const UserController = require('./controller/UserController');
const DashboardController = require('./controller/DashboardController');
const FileConfig = require('./config/Uploads');
const LoginController = require('./controller/LoginController');
const RegistrationController = require('./controller/RegistrationController');
const ApprovalController = require('./controller/ApprovalController.js');
const RejectionController = require('./controller/RejectionController');
const { verifyToken1 } = require('./config/VerifyToken');

const routes = express.Router();

routes.get('/status',(req,res) => {
    res.send({status:200});
})





//Registration
routes.post('/registration/:eventid',verifyToken,RegistrationController.create);
routes.get('/registration/:registrationid',RegistrationController.getRegistration);
routes.get('/registration/',verifyToken,RegistrationController.MyRegistrations);



//Approval and Rejection
routes.post('/registration/:registrationid/approval',verifyToken,ApprovalController.approval);
routes.post('/registration/:registrationid/reject',verifyToken,RejectionController.reject);

//authentication
routes.post('/login',LoginController.store);

//Dashboard
//routes.get('/dashboard/:eventid', DashboardController.getEvent);
routes.get('/dashboard',verifyToken,DashboardController.getAllEvents);
routes.get('/dashboard/events',verifyToken,DashboardController.getEventsByUserId);
routes.get('/dashboard/:sport',verifyToken,DashboardController.getEventByCategory);

//Event
routes.delete('/events/:eventid',verifyToken,RaceEventsController.deleteEvent);
routes.post('/event',verifyToken,uploadtoS3.single("thumbnail"), RaceEventsController.CreateEvent);



//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId',UserController.getUser);

module.exports  = routes;