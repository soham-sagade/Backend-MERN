const mongoose = require('mongoose');

const RegisterationSchema = new mongoose.Schema({
    date:String,
    approved: Boolean,
    owner: String,
    eventTitle: String,
    eventPrice: String,
    userEmail: String,
    eventDate: String,


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RaceEvent"
    }
})

module.exports = mongoose.model('Registeration',RegisterationSchema);