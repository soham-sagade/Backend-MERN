const mongoose = require('mongoose');
const { hash } = require('bcrypt');

const RaceEventSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    sport:String,
    thumbnail:String,
    date:Date,
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},
{
    toJSON:
    {
        virtuals: true
    }
})


RaceEventSchema.virtual("thumbnail_url").get(function() { return this.thumbnail});

module.exports = mongoose.model('RaceEvent',RaceEventSchema);